const HistoryItem = ({ item }) => {
  return (
    <div className="p-3 rounded-lg border border-slate-800 hover:bg-slate-800 transition">
      <div className="flex justify-between mb-1">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-bold
          ${
            item.label === "SPAM"
              ? "bg-red-500/20 text-red-400"
              : "bg-emerald-500/20 text-emerald-400"
          }`}
        >
          {item.label}
        </span>
        <span className="text-[10px] text-slate-500">
          {(item.confidence * 100).toFixed(0)}%
        </span>
      </div>
      <p className="text-xs italic text-slate-400 line-clamp-2">
        “{item.text}”
      </p>
    </div>
  );
};

export default HistoryItem;
