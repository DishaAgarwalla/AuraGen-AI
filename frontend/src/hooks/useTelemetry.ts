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

  const [telemetry, setTelemetry] = useState<TelemetryData>(telemetryRef.current);
  const [isLoggingEnabled, setIsLoggingEnabled] = useState(
    process.env.NODE_ENV === "development"
  );

  //----------------------------------------------------
  // Sync State
  //----------------------------------------------------

  const updateTelemetry = () => {
    setTelemetry({ ...telemetryRef.current });
  };

  //----------------------------------------------------
  // Utility: Log with timestamp
  //----------------------------------------------------

  const logWithTimestamp = (emoji: string, message: string, data?: any) => {
    if (!isLoggingEnabled) return;
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${emoji} ${message}`);
    if (data) {
      console.log(data);
    }
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
      const speed = dt > 0 ? Number((distance / dt).toFixed(2)) : 0;

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

      // Only log every 50th mouse move to reduce spam
      if (telemetryRef.current.mouseMoves % 50 === 0) {
        logWithTimestamp("🖱️", `Mouse moves: ${telemetryRef.current.mouseMoves}`);
      }

      updateTelemetry();
    };

    //--------------------------------------------------

    const handleClick = () => {
      const now = Date.now();
      const rageClick = now - lastClickTime.current < 300;
      lastClickTime.current = now;
      lastInteraction.current = now;

      telemetryRef.current.clicks++;
      if (rageClick) {
        telemetryRef.current.rageClicks++;
        logWithTimestamp("⚠️", `Rage click detected! Total: ${telemetryRef.current.rageClicks}`);
      }

      if (telemetryRef.current.clicks % 5 === 0) {
        logWithTimestamp("👆", `Total clicks: ${telemetryRef.current.clicks}`);
      }

      updateTelemetry();
    };

    //--------------------------------------------------

    const handleKeyDown = (e: KeyboardEvent) => {
      lastInteraction.current = Date.now();
      telemetryRef.current.keyPresses++;

      if (e.key === "Backspace") {
        telemetryRef.current.backspaces++;
        logWithTimestamp("⌨️", `Backspace pressed: ${telemetryRef.current.backspaces}`);
      }

      if (telemetryRef.current.keyPresses % 20 === 0) {
        logWithTimestamp("⌨️", `Total key presses: ${telemetryRef.current.keyPresses}`);
      }

      updateTelemetry();
    };

    //--------------------------------------------------

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    logWithTimestamp("🚀", "Telemetry tracking started");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      logWithTimestamp("🛑", "Telemetry tracking stopped");
    };
  }, [isLoggingEnabled]);

  //----------------------------------------------------
  // Field Focus Tracking
  //----------------------------------------------------

  useEffect(() => {
    const inputs = document.querySelectorAll("input, select, textarea");

    const onFocus = (e: Event) => {
      const target = e.target as HTMLInputElement;
      currentField.current = target.name;
      fieldStartTime.current = Date.now();
      telemetryRef.current.focusedField = target.name;

      logWithTimestamp("🟢", `Focused Field: ${target.name}`);
      updateTelemetry();
    };

    //--------------------------------------------------

    const onBlur = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const duration = Date.now() - fieldStartTime.current;
      
      if (duration > 0) {
        totalFieldTime.current += duration;
        completedFields.current++;
        telemetryRef.current.fieldsCompleted = completedFields.current;
        telemetryRef.current.averageFieldTime = Math.round(
          totalFieldTime.current / completedFields.current
        );

        logWithTimestamp(
          "🔵", 
          `${target.name} completed in ${(duration / 1000).toFixed(2)}s`,
          { avgTime: `${(telemetryRef.current.averageFieldTime / 1000).toFixed(2)}s` }
        );
      }

      updateTelemetry();
    };

    //--------------------------------------------------

    inputs.forEach((input) => {
      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
    });

    logWithTimestamp("📋", `Tracking ${inputs.length} form fields`);

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", onFocus);
        input.removeEventListener("blur", onBlur);
      });
    };
  }, [isLoggingEnabled]);

  //----------------------------------------------------
  // Idle Time + Form Duration
  //----------------------------------------------------

  useEffect(() => {
    const timer = setInterval(() => {
      const currentIdleTime = Math.floor(
        (Date.now() - lastInteraction.current) / 1000
      );
      const currentFormDuration = Math.floor(
        (Date.now() - formStartTime.current) / 1000
      );

      telemetryRef.current.idleTime = currentIdleTime;
      telemetryRef.current.formDuration = currentFormDuration;

      // Log idle time warnings
      if (currentIdleTime > 30 && currentIdleTime % 10 === 0) {
        logWithTimestamp("💤", `User idle for ${currentIdleTime}s`);
      }

      updateTelemetry();
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoggingEnabled]);

  //----------------------------------------------------
  // Send Telemetry to Backend
  //----------------------------------------------------

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const payload = {
          ...telemetryRef.current,
          timestamp: new Date().toISOString(),
        };

        // Only log summary in development
        if (isLoggingEnabled) {
          console.log("\n📊 ============ TELEMETRY SUMMARY ============");
          console.log(`📈 Mouse Moves: ${payload.mouseMoves}`);
          console.log(`🖱️  Clicks: ${payload.clicks} (Rage: ${payload.rageClicks})`);
          console.log(`⌨️  Key Presses: ${payload.keyPresses} (Backspaces: ${payload.backspaces})`);
          console.log(`⏱️  Form Duration: ${payload.formDuration}s (Idle: ${payload.idleTime}s)`);
          console.log(`📝 Fields Completed: ${payload.fieldsCompleted}`);
          console.log(`⏳ Avg Field Time: ${(payload.averageFieldTime / 1000).toFixed(2)}s`);
          console.log(`🎯 Current Field: ${payload.focusedField || "None"}`);
          console.log("=============================================\n");
        }

        const response = await sendTelemetry(payload);

        if (isLoggingEnabled) {
          //------------------------------------------------
          // Cognitive Load
          //------------------------------------------------
          if (response?.cognitiveLoad) {
            const { score, status, reasons } = response.cognitiveLoad;
            const statusEmoji = status === "HIGH" ? "🔴" : status === "MEDIUM" ? "🟡" : "🟢";
            
            console.log("\n🧠 ============ COGNITIVE LOAD ============");
            console.log(`${statusEmoji} Status: ${status}`);
            console.log(`📊 Score: ${score}/100`);
            if (reasons && reasons.length > 0) {
              console.log("📝 Reasons:");
              reasons.forEach((reason: string, index: number) => {
                console.log(`   ${index + 1}. ${reason}`);
              });
            }
            console.log("===========================================\n");
          }

          //------------------------------------------------
          // Adaptive UI
          //------------------------------------------------
          if (response?.adaptiveUI) {
            console.log("\n🎨 ============ ADAPTIVE UI ============");
            console.log(`🚀 Generated at: ${new Date().toLocaleTimeString()}`);
            console.log(`📊 Cognitive Score: ${response.adaptiveUI.cognitiveScore}`);
            console.log(`📝 Status: ${response.adaptiveUI.status}`);
            console.log("=========================================\n");
          }
        }

        if (response?.adaptiveUI) {
          // This will be consumed by useAdaptiveUI() / Socket.IO
          // Store in localStorage for debugging
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("adaptiveUI", { detail: response.adaptiveUI })
            );
          }
        }

      } catch (error) {
        if (isLoggingEnabled) {
          console.error("❌ Failed to send telemetry:", error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoggingEnabled]);

  //----------------------------------------------------
  // Return Current Telemetry
  //----------------------------------------------------

  return {
    telemetry,
    getTelemetrySnapshot: () => ({ ...telemetryRef.current }),
    resetTelemetry: () => {
      telemetryRef.current = {
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
      };
      updateTelemetry();
      logWithTimestamp("🔄", "Telemetry has been reset");
    },
    toggleLogging: () => {
      setIsLoggingEnabled(!isLoggingEnabled);
      logWithTimestamp("🔊", `Logging ${!isLoggingEnabled ? "enabled" : "disabled"}`);
    },
  };
}