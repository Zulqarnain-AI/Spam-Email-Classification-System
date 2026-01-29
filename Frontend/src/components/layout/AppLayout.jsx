import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AppLayout = ({ children, history, setHistory }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar history={history} setHistory={setHistory} />

      <main className="flex-1 p-6 lg:p-10">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
