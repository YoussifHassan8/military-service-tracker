import Nav from "./components/Nav";
import Heatmap from "./components/Heatmap";
function App() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Nav />
      <Heatmap startDate="2025-12-01" endDate="2026-02-27" />
    </div>
  );
}

export default App;
