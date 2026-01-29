import { Send } from "lucide-react";

const EmailInput = ({ text, setText, loading, onAnalyze }) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex justify-between p-4 text-xs text-slate-400 border-b border-slate-800">
                <span>EMAIL CONTENT</span>
                <span>{text.length} chars</span>
            </div>

            <textarea
                className="w-full h-64 bg-transparent p-6 focus:outline-none resize-none text-slate-200"
                placeholder="Paste raw email content for AI analysis..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="p-4 flex justify-end bg-slate-900 border-t border-slate-800">
                <button
                    onClick={onAnalyze}
                    disabled={loading || !text.trim()}
                    className={`px-10 py-3 rounded-xl font-semibold transition-all
                    ${
                        loading
                            ? "bg-slate-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02]"
                        }`}

                >
                    {loading ? "Analyzing..." : <>Analyze Email <Send size={18} /></>}
                </button>
            </div>
        </div>
    );
};

export default EmailInput;
