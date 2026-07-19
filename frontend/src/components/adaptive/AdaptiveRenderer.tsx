"use client";

import { AdaptiveUI } from "@/types/adaptiveUI";

interface Props {
  adaptiveUI: AdaptiveUI | null;
}

export default function AdaptiveRenderer({
  adaptiveUI,
}: Props) {
  if (!adaptiveUI) return null;

  return (
    <section
      className="
        mt-10
        rounded-2xl
        border
        border-blue-300
        bg-gradient-to-br
        from-blue-50
        to-white
        p-6
        shadow-xl
      "
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-700">
          🤖 Adaptive Interface Generated
        </h2>

        <p className="mt-2 text-gray-600">
          AuraGen detected that the user was experiencing
          a high cognitive load and generated a simplified
          version of the interface using AI.
        </p>
      </div>

      {/* Analysis */}

      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          Cognitive Load Analysis
        </h3>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <p className="text-gray-500">
              Cognitive Score
            </p>

            <p className="text-3xl font-bold text-blue-700">
              {adaptiveUI.cognitiveScore}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              User Status
            </p>

            <p
              className={`text-2xl font-bold ${
                adaptiveUI.status === "HIGH"
                  ? "text-red-600"
                  : adaptiveUI.status === "MEDIUM"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {adaptiveUI.status}
            </p>
          </div>
        </div>
      </div>

      {/* Simplified UI */}

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">
          AI Generated Simplified UI
        </h3>

        <pre
          className="
            whitespace-pre-wrap
            break-words
            rounded-lg
            bg-gray-100
            p-4
            text-sm
            leading-7
            overflow-auto
          "
        >
          {adaptiveUI.generatedUI}
        </pre>
      </div>
    </section>
  );
}