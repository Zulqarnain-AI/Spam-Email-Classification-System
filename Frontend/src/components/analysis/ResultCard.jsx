import { ShieldAlert, ShieldCheck } from "lucide-react";

const ResultCard = ({ result }) => {
  const isSpam = result.label === "SPAM";
  const confidence = Math.round(result.confidence * 100);

  return (
    <div
      className={`rounded-2xl p-6 w-full max-w-md border animate-in fade-in slide-in-from-bottom-4 duration-500
      ${
        isSpam
          ? "bg-red-950/40 border-red-800"
          : "bg-emerald-950/40 border-emerald-800"
      }`}
    >
      {/* Label */}
      <div className="flex justify-between items-center mb-6">
        <span
          className={`px-4 py-1 rounded-full text-xs font-bold tracking-wide
          ${
            isSpam
              ? "bg-red-500/20 text-red-400"
              : "bg-emerald-500/20 text-emerald-400"
          }`}
        >
          {result.label}
        </span>

        <span className="text-xs text-green-400 flex items-center gap-1">
          ✔ Success
        </span>
      </div>

      {/* Gauge */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-700"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray="251"
              strokeDashoffset={251 - (confidence / 100) * 251}
              className={`transition-all duration-1000 ${
                isSpam ? "text-red-500" : "text-emerald-500"
              }`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold">{confidence}%</span>
            <span className="text-[10px] text-slate-400">CONFIDENCE</span>
          </div>
        </div>

        {/* Icon + Text */}
        <div>
          {isSpam ? (
            <ShieldAlert className="text-red-500 mb-2" size={28} />
          ) : (
            <ShieldCheck className="text-emerald-500 mb-2" size={28} />
          )}

          <p className="text-sm text-slate-300 leading-relaxed">
            The AI model predicts this email as{" "}
            <span className="font-semibold">{result.label}</span> with
            high confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
