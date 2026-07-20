import { useState } from "react";
import { AdaptiveUI } from "@/types/adaptiveUI";

export default function useAdaptiveUI() {
  const [adaptiveUI, setAdaptiveUI] = useState<AdaptiveUI | null>(null);

  function updateAdaptiveUI(data: AdaptiveUI) {
    console.log("🔄 Updating Adaptive UI...");
    setAdaptiveUI(data);
  }

  function clearAdaptiveUI() {
    console.log("🧹 Clearing Adaptive UI...");
    setAdaptiveUI(null);
  }

  return {
    adaptiveUI,
    updateAdaptiveUI,
    clearAdaptiveUI,
    isActive: !!adaptiveUI,
  };
}