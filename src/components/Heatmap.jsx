import { useEffect, useRef } from "react";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";

const Heatmap = ({ startDate, endDate }) => {
  const calRef = useRef(null);

  useEffect(() => {
    if (!calRef.current) return;

    const cal = new CalHeatmap();

    const generateData = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();

      const data = [];
      let current = new Date(start);

      while (current <= end) {
        data.push({
          date: current.toISOString(),
          value: current <= today ? 1 : 0,
        });
        current.setDate(current.getDate() + 1);
      }

      return data;
    };

    cal.paint({
      itemSelector: calRef.current,

      date: {
        start: new Date(startDate),
        locale: "ar",
      },

      range: 12,
      domain: {
        type: "month",
      },

      subDomain: {
        type: "day",
      },

      data: {
        source: generateData(),
        x: "date",
        y: "value",
      },

      scale: {
        color: {
          type: "linear",
          range: ["#27272a", "#10b981"],
        },
      },
    });

    return () => cal.destroy();
  }, [startDate, endDate]);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="text-white mb-4 text-lg font-semibold">تقويم الخدمة</h2>

      {/* Wrap the heatmap container and add custom styles */}
      <div className="heatmap-wrapper">
        <div ref={calRef} style={{ width: "100%" }} />
        <style>{`
          .heatmap-wrapper .ch-domain-text {
            fill: white !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Heatmap;
