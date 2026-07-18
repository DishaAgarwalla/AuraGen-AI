"use client";

import { useEffect, useRef, useState } from "react";
import { sendTelemetry } from "@/services/api";

export interface TelemetryData {
  // Mouse Behaviour
  mouseMoves: number;
  clicks: number;
  rageClicks: number;

  mouseX: number;
  mouseY: number;
  mouseSpeed: number;

  // Keyboard Behaviour
  keyPresses: number;
  backspaces: number;

  // Timing
  idleTime: number;
  formDuration: number;

  // Form Behaviour
  focusedField: string;
  averageFieldTime: number;
  fieldsCompleted: number;
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
  // Telemetry Ref
  //----------------------------------------------------

  const telemetryRef = useRef<TelemetryData>({
    mouseMoves: 0,
    clicks: 0,
    rageClicks: 0,

    mouseX: 0,
    mouseY: 0,
    mouseSpeed: 0,

    keyPresses: 0,
    backspaces: 0,

    idleTime: 0,
    formDuration: 0,

    focusedField: "",

    averageFieldTime: 0,

    fieldsCompleted: 0,
  });

  //----------------------------------------------------
  // State
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
  // Mouse + Keyboard Tracking
  //----------------------------------------------------

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      const dx = e.clientX - lastMouse.current.x;

      const dy = e.clientY - lastMouse.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const dt = now - lastMouse.current.time;

      const speed =
        dt > 0
          ? Number((distance / dt).toFixed(2))
          : 0;

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

    //--------------------------------------------------

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

    //--------------------------------------------------

    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      lastInteraction.current = Date.now();

      telemetryRef.current.keyPresses++;

      if (e.key === "Backspace") {
        telemetryRef.current.backspaces++;
      }

      updateTelemetry();
    };

    //--------------------------------------------------

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

      console.log(
        `🟢 Focused Field: ${target.name}`
      );

      updateTelemetry();
    };

    //--------------------------------------------------

    const onBlur = (e: Event) => {
      const target = e.target as HTMLInputElement;

      const duration =
        Date.now() - fieldStartTime.current;

      totalFieldTime.current += duration;

      completedFields.current++;

      telemetryRef.current.fieldsCompleted =
        completedFields.current;

      telemetryRef.current.averageFieldTime =
        Math.round(
          totalFieldTime.current /
            completedFields.current
        );

      console.log(
        `🔵 ${target.name} completed in ${(
          duration / 1000
        ).toFixed(2)} seconds`
      );

      updateTelemetry();
    };

    //--------------------------------------------------

    inputs.forEach((input) => {
      input.addEventListener(
        "focus",
        onFocus
      );

      input.addEventListener(
        "blur",
        onBlur
      );
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener(
          "focus",
          onFocus
        );

        input.removeEventListener(
          "blur",
          onBlur
        );
      });
    };
  }, []);

  //----------------------------------------------------
  // Idle Time + Form Duration
  //----------------------------------------------------

  useEffect(() => {
    const timer = setInterval(() => {
      telemetryRef.current.idleTime =
        Math.floor(
          (Date.now() -
            lastInteraction.current) /
            1000
        );

      telemetryRef.current.formDuration =
        Math.floor(
          (Date.now() -
            formStartTime.current) /
            1000
        );

      updateTelemetry();
    }, 1000);

    return () => clearInterval(timer);
  }, []);
    //----------------------------------------------------
  // Send Telemetry to Backend
  //----------------------------------------------------

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("\n====================================");
        console.log("📤 Sending Telemetry");
        console.log("====================================");

        console.table(telemetryRef.current);

        const response = await sendTelemetry(
          telemetryRef.current
        );

        console.log("\n====================================");
        console.log("📥 Backend Response");
        console.log("====================================");

        console.log(response);

        //------------------------------------------------
        // Cognitive Load
        //------------------------------------------------

        if (response?.cognitiveLoad) {
          console.log("\n🧠 Cognitive Load");

          console.table(response.cognitiveLoad);
        }

        //------------------------------------------------
        // Adaptive UI
        //------------------------------------------------

        if (response?.adaptiveUI) {
          console.log("\n🎨 Adaptive UI Generated");

          console.log(response.adaptiveUI);

          /*
          Later this will be consumed by
          useAdaptiveUI() / Socket.IO to
          dynamically replace the form.
          */
        }
      } catch (error) {
        console.error(
          "\n❌ Failed to send telemetry:",
          error
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //----------------------------------------------------
  // Return Current Telemetry
  //----------------------------------------------------

  return telemetry;
}