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
      ? "bg-gradient-to-r from-red-400 to-red-600"
      : status === "MEDIUM"
      ? "bg-gradient-to-r from-amber-400 to-amber-600"
      : "bg-gradient-to-r from-emerald-400 to-emerald-600";

  const statusColor =
    status === "HIGH"
      ? "text-red-600 bg-red-50 border-red-200/50"
      : status === "MEDIUM"
      ? "text-amber-600 bg-amber-50 border-amber-200/50"
      : "text-emerald-600 bg-emerald-50 border-emerald-200/50";

  const statusEmoji =
    status === "HIGH"
      ? "🔴"
      : status === "MEDIUM"
      ? "🟡"
      : "🟢";

  const statusMessages = {
    LOW: "User is navigating the form comfortably. 🎯",
    MEDIUM: "User is showing signs of hesitation. Monitor interaction. 👀",
    HIGH: "High cognitive load detected. Adaptive UI has been triggered. ⚡",
  };

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm p-6 shadow-lg shadow-slate-200/50">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <h2 className="text-base font-bold text-slate-800">
            Cognitive Load
          </h2>
        </div>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            border
            ${statusColor}
            flex
            items-center
            gap-1.5
          `}
        >
          <span>{statusEmoji}</span>
          {status}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80">
          <div
            className={`${barColor} h-full rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: `${score}%`,
            }}
          />
        </div>

        {/* Score markers */}
        <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[10px] text-slate-400">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Score display */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-500 font-medium">Score</span>
        <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
          {score}/100
        </span>
      </div>

      {/* Status message */}
      <div className="mt-3 p-3 rounded-lg bg-slate-50/80 border border-slate-200/50">
        <p className="text-sm text-slate-600">
          {statusMessages[status]}
        </p>
      </div>
    </div>
  );
}