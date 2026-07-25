import { useState, useEffect } from "react";
import { CognitiveLoad } from "@/types/adaptiveUI";

export default function useCognitiveLoad() {
  const [cognitiveLoad, setCognitiveLoad] = useState<CognitiveLoad>({
    score: 0,
    status: "LOW",
    reasons: [],
  });

  function updateCognitiveLoad(data: Partial<CognitiveLoad>) {
    setCognitiveLoad((prev) => ({
      ...prev,
      ...data,
    }));
  }

  function resetCognitiveLoad() {
    setCognitiveLoad({
      score: 0,
      status: "LOW",
      reasons: [],
    });
  }

  return {
    cognitiveLoad,
    updateCognitiveLoad,
    resetCognitiveLoad,
    isHigh: cognitiveLoad.status === "HIGH",
    isMedium: cognitiveLoad.status === "MEDIUM",
    isLow: cognitiveLoad.status === "LOW",
  };
}