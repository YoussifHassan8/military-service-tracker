import Nav from "./components/Nav";
import Heatmap from "./components/Heatmap";
import ServiceDialog from "./components/ServiceDialog";
import Footer from "./components/Footer";
import { useState } from "react";

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
    <div className="min-h-screen bg-zinc-900 text-white">
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
        <div className="max-w-5xl mx-auto p-6">
          <Heatmap startDate={startDate} endDate={endDate} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
