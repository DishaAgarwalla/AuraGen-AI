"use client";

interface ProgressIndicatorProps {
  score: number;
  status: "LOW" | "MEDIUM" | "HIGH";
}

export default function ProgressIndicator({ score, status }: ProgressIndicatorProps) {
  const getStatusColor = () => {
    if (status === "HIGH") return "text-red-600 bg-red-50 border-red-200";
    if (status === "MEDIUM") return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getBarColor = () => {
    if (status === "HIGH") return "bg-red-500";
    if (status === "MEDIUM") return "bg-yellow-500";
    return "bg-green-500";
  };

  const getMessage = () => {
    if (status === "HIGH") return "High cognitive load detected. Adaptive UI triggered.";
    if (status === "MEDIUM") return "User showing signs of hesitation. Monitoring...";
    return "User navigating comfortably.";
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">🧠 Cognitive Load</span>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor()}`}>
            {status}
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-700">{score}/100</span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-700 ${getBarColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <p className="mt-2 text-xs text-gray-500">{getMessage()}</p>
    </div>
  );
}