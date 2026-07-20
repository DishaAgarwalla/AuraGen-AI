"use client";

import { AdaptiveUI } from "@/types/adaptiveUI";
import { useState } from "react";

interface Props {
  adaptiveUI: AdaptiveUI | null;
}

export default function AdaptiveRenderer({
  adaptiveUI,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!adaptiveUI) return null;

  return (
    <section className="mb-8 fade-in">
      <div
        className="
          rounded-2xl
          border-2
          border-blue-300/50
          bg-gradient-to-br
          from-blue-50/80
          via-indigo-50/60
          to-purple-50/80
          backdrop-blur-sm
          p-6
          shadow-xl
          shadow-blue-500/10
          pulse-glow
        "
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <h2 className="text-2xl font-bold text-blue-700">
                Adaptive Interface Generated
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200/50">
                LIVE
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              AuraGen detected high cognitive load and generated a simplified
              version of the interface using AI.
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <svg
              className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {isExpanded && (
          <div className="mt-5 space-y-4 slide-in">
            {/* Cognitive Load Analysis */}
            <div className="rounded-xl border border-blue-200/50 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
                <span className="text-lg">🧠</span>
                Cognitive Load Analysis
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-blue-50/50">
                  <p className="text-xs text-slate-500 font-medium">Cognitive Score</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {adaptiveUI.cognitiveScore}
                    <span className="text-sm font-normal text-slate-400">/100</span>
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50/50">
                  <p className="text-xs text-slate-500 font-medium">User Status</p>
                  <p
                    className={`text-xl font-bold ${
                      adaptiveUI.status === "HIGH"
                        ? "text-red-500"
                        : adaptiveUI.status === "MEDIUM"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {adaptiveUI.status}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-blue-50/50">
                  <p className="text-xs text-slate-500 font-medium">Action</p>
                  <p className="text-sm font-medium text-blue-600">
                    {adaptiveUI.status === "HIGH" ? "🚀 Simplified UI" : "✅ Normal"}
                  </p>
                </div>
              </div>
            </div>

            {/* Simplified UI Preview */}
            <div className="rounded-xl border border-blue-200/50 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <span className="text-lg">🎨</span>
                AI Generated Simplified UI
              </h3>

              <pre
                className="
                  whitespace-pre-wrap
                  break-words
                  rounded-lg
                  bg-slate-900/95
                  p-4
                  text-xs
                  font-mono
                  leading-relaxed
                  overflow-auto
                  max-h-64
                  text-slate-300
                  border
                  border-slate-700/50
                  shadow-inner
                "
              >
                {adaptiveUI.generatedCode ?? adaptiveUI.simplifiedUI ?? "No simplified UI available"}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}