"use client";

interface ProgressIndicatorProps {
  score: number;
  status: "LOW" | "MEDIUM" | "HIGH";
}

export default function ProgressIndicator({
  score,
  status,
}: ProgressIndicatorProps) {
  const barColor =
    status === "HIGH"
      ? "bg-red-500"
      : status === "MEDIUM"
      ? "bg-yellow-500"
      : "bg-green-500";

  const statusColor =
    status === "HIGH"
      ? "text-red-600"
      : status === "MEDIUM"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">
          Cognitive Load
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor} bg-slate-100`}
        >
          {status}
        </span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`${barColor} h-full rounded-full transition-all duration-700`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>Score</span>

        <span className="font-semibold">
          {score}/100
        </span>
      </div>

      <div className="mt-4">
        {status === "LOW" && (
          <p className="text-sm text-green-700">
            User is navigating the form comfortably.
          </p>
        )}

        {status === "MEDIUM" && (
          <p className="text-sm text-yellow-700">
            User is showing signs of hesitation. Monitor interaction.
          </p>
        )}

        {status === "HIGH" && (
          <p className="text-sm text-red-700">
            High cognitive load detected. Adaptive UI has been triggered.
          </p>
        )}
      </div>
    </div>
  );
}