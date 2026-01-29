import { History, Trash2 } from "lucide-react";
import HistoryItem from "../analysis/HistoryItem";

const Sidebar = ({ history, setHistory }) => {
  return (
    <aside className="hidden lg:block w-80 border-r border-slate-800 bg-slate-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold flex gap-2 items-center">
          <History size={18} /> Analysis History
        </h3>
        <button
          onClick={() => {
            setHistory([]);
            localStorage.removeItem("spam_history");
          }}
          className="text-slate-400 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {history.length === 0 ? (
          <p className="text-slate-500 text-sm italic text-center">
            No scans yet
          </p>
        ) : (
          history.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
