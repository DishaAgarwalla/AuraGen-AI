"use client";

import { useEffect, useRef, useState } from "react";
import { sendTelemetry } from "@/services/api";

export interface TelemetryData {
  mouseMoves: number;
  clicks: number;
  rageClicks: number;

  keyPresses: number;
  backspaces: number;

  mouseX: number;
  mouseY: number;

  mouseSpeed: number;

  idleTime: number;

  formDuration: number;

  focusedField: string;
  averageFieldTime: number;
}

export default function useTelemetry() {
  //----------------------------------------------------
  // Timer References
  //----------------------------------------------------

  const formStartTime = useRef(Date.now());

  const lastInteraction = useRef(Date.now());

  const lastClickTime = useRef(0);

  const lastMouse = useRef({
    x: 0,
    y: 0,
    time: Date.now(),
  });

  //----------------------------------------------------
  // Field Tracking
  //----------------------------------------------------

  const currentField = useRef("");

  const fieldStartTime = useRef(0);

  const totalFieldTime = useRef(0);

  const completedFields = useRef(0);

  //----------------------------------------------------
  // Telemetry Ref (Source of Truth)
  //----------------------------------------------------

  const telemetryRef = useRef<TelemetryData>({
    mouseMoves: 0,
    clicks: 0,
    rageClicks: 0,

    keyPresses: 0,
    backspaces: 0,

    mouseX: 0,
    mouseY: 0,

    mouseSpeed: 0,

    idleTime: 0,

    formDuration: 0,

    focusedField: "",

    averageFieldTime: 0,
  });

  //----------------------------------------------------
  // Optional State (For Debugging/UI)
  //----------------------------------------------------

  const [telemetry, setTelemetry] =
    useState<TelemetryData>(telemetryRef.current);

  //----------------------------------------------------
  // Sync State
  //----------------------------------------------------

  const updateTelemetry = () => {
    setTelemetry({ ...telemetryRef.current });
  };

  //----------------------------------------------------
  // Mouse Movement
  //----------------------------------------------------

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      const dx = e.clientX - lastMouse.current.x;

      const dy = e.clientY - lastMouse.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const dt = now - lastMouse.current.time;

      const speed =
        dt > 0 ? Number((distance / dt).toFixed(2)) : 0;

      lastMouse.current = {
        x: e.clientX,
        y: e.clientY,
        time: now,
      };

      lastInteraction.current = now;

      telemetryRef.current.mouseMoves++;

      telemetryRef.current.mouseX = e.clientX;

      telemetryRef.current.mouseY = e.clientY;

      telemetryRef.current.mouseSpeed = speed;

      updateTelemetry();
    };

    //------------------------------------------------

    const handleClick = () => {
      const now = Date.now();

      const rageClick =
        now - lastClickTime.current < 300;

      lastClickTime.current = now;

      lastInteraction.current = now;

      telemetryRef.current.clicks++;

      if (rageClick) {
        telemetryRef.current.rageClicks++;
      }

      updateTelemetry();
    };

    //------------------------------------------------

    const handleKeyDown = (e: KeyboardEvent) => {
      lastInteraction.current = Date.now();

      telemetryRef.current.keyPresses++;

      if (e.key === "Backspace") {
        telemetryRef.current.backspaces++;
      }

      updateTelemetry();
    };

    //------------------------------------------------

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "click",
      handleClick
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "click",
        handleClick
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  //----------------------------------------------------
  // Field Focus Tracking
  //----------------------------------------------------

  useEffect(() => {
    const inputs = document.querySelectorAll(
      "input, select, textarea"
    );

    const onFocus = (e: Event) => {
      const target = e.target as HTMLInputElement;

      currentField.current = target.name;

      fieldStartTime.current = Date.now();

      telemetryRef.current.focusedField =
        target.name;

      console.log("🟢 Focused:", target.name);
    };

    const onBlur = (e: Event) => {
      const target = e.target as HTMLInputElement;

      const duration =
        Date.now() - fieldStartTime.current;

      totalFieldTime.current += duration;

      completedFields.current++;

      telemetryRef.current.averageFieldTime =
        Math.round(
          totalFieldTime.current /
            completedFields.current
        );

      console.log(
        `🔵 ${target.name} completed in ${(
          duration / 1000
        ).toFixed(2)}s`
      );
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", onFocus);

      input.addEventListener("blur", onBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", onFocus);

        input.removeEventListener("blur", onBlur);
      });
    };
  }, []);

  //----------------------------------------------------
  // Timers
  //----------------------------------------------------

  useEffect(() => {
    const timer = setInterval(() => {
      telemetryRef.current.idleTime = Math.floor(
        (Date.now() - lastInteraction.current) /
          1000
      );

      telemetryRef.current.formDuration =
        Math.floor(
          (Date.now() - formStartTime.current) /
            1000
        );

      updateTelemetry();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //----------------------------------------------------
  // Send Telemetry
  //----------------------------------------------------

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log(
          "📤 Sending Telemetry..."
        );

        console.table(telemetryRef.current);

        await sendTelemetry(
          telemetryRef.current
        );
      } catch (error) {
        console.error(
          "Telemetry Error:",
          error
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //----------------------------------------------------

  return telemetry;
}