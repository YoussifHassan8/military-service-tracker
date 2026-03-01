import Nav from "./components/Nav";
import Heatmap from "./components/Heatmap";
import ServiceDialog from "./components/ServiceDialog";
import Footer from "./components/Footer";
import { useState } from "react";
import ProgressChart from "./components/ProgressChart";
import TimelineChart from "./components/TimelineChart";
import StatsCards from "./components/StatsCards";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) return;

    if (new Date(endDate) <= new Date(startDate)) {
      alert("تاريخ النهاية لازم يكون بعد البداية");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <Nav onReset={handleReset} />

      {!submitted && (
        <ServiceDialog
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onSubmit={handleSubmit}
        />
      )}

      {submitted && (
        <div className="max-w-6xl mx-auto p-6 flex-1 flex flex-col gap-8">
          {/* Stats Cards */}
          <StatsCards startDate={startDate} endDate={endDate} />

          {/* Progress + Timeline Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProgressChart startDate={startDate} endDate={endDate} />
            <TimelineChart startDate={startDate} endDate={endDate} />
          </div>

          {/* Heatmap */}
          <Heatmap startDate={startDate} endDate={endDate} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
