import { useState } from "react";

import { AdaptiveUI } from "../types/adaptiveUI";

export function useAdaptiveUI() {
  const [adaptiveUI, setAdaptiveUI] =
    useState<AdaptiveUI | null>(null);

  function updateAdaptiveUI(
    data: AdaptiveUI
  ) {
    console.log("Updating Adaptive UI...");

    setAdaptiveUI(data);
  }

  function clearAdaptiveUI() {
    setAdaptiveUI(null);
  }

  return {
    adaptiveUI,
    updateAdaptiveUI,
    clearAdaptiveUI,
  };
}