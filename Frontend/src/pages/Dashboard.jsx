import { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import EmailInput from "../components/analysis/EmailInput";
import ResultCard from "../components/analysis/ResultCard";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("spam_history") || "[]");
    setHistory(saved);
  }, []);

  const analyzeEmail = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.status === "success") {
        const entry = {
          id: Date.now(),
          text: text.slice(0, 60) + "...",
          ...data,
        };

        const updated = [entry, ...history].slice(0, 5);
        setResult(data);
        setHistory(updated);
        localStorage.setItem("spam_history", JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout history={history} setHistory={setHistory}>
      <div className="space-y-8">
        <EmailInput
          text={text}
          setText={setText}
          loading={loading}
          onAnalyze={analyzeEmail}
        />

        {/* RESULT SECTION */}
        {result && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold tracking-wide text-slate-200">
              Result
            </h2>
            <ResultCard result={result} />
          </section>
        )}
      </div>

    </AppLayout>
  );
};

export default Dashboard;
