"use client";

import { AdaptiveUI } from "@/types/adaptiveUI";

interface Props {
  adaptiveUI: AdaptiveUI | null;
}

export default function AdaptiveRenderer({ adaptiveUI }: Props) {
  if (!adaptiveUI) return null;

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl fade-in">
      <div className="flex items-start gap-3">
        <span className="text-2xl">🤖</span>
        <div className="flex-1">
          <h4 className="font-semibold text-blue-700">Adaptive UI Activated</h4>
          <p className="text-sm text-gray-600 mt-1">
            Simplified interface generated based on cognitive load analysis
          </p>
          <div className="mt-2 flex gap-4 text-xs">
            <span className="text-gray-500">Score: <strong className="text-blue-600">{adaptiveUI.cognitiveScore}</strong></span>
            <span className="text-gray-500">Status: <strong className="text-red-500">{adaptiveUI.status}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}