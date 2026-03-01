import { useEffect, useRef } from "react";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import dayjs from "dayjs";
import "cal-heatmap/cal-heatmap.css";

const Heatmap = ({ startDate, endDate }) => {
  const calRef = useRef(null);

  useEffect(() => {
    if (!calRef.current || !startDate || !endDate) return;

    const cal = new CalHeatmap();

    const calculateMonthRange = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      return (
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1
      );
    };

    const generateData = () => {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const today = dayjs();

      const data = [];
      let current = start;

      while (current.isBefore(end) || current.isSame(end, "day")) {
        data.push({
          date: current.format("YYYY-MM-DD"),
          value:
            current.isBefore(today, "day") || current.isSame(today, "day")
              ? 1
              : 0,
        });

        current = current.add(1, "day");
      }

      return data;
    };

    cal.paint(
      {
        itemSelector: calRef.current,

        date: {
          start: new Date(startDate),
          locale: "ar",
        },

        range: calculateMonthRange(),

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
            domain: [0, 1],
            range: ["#27272a", "#10b981"],
          },
        },
      },
      [
        [
          Tooltip,
          {
            text: (date) => {
              const end = dayjs(endDate);
              const current = dayjs(date);
              const diff = end.diff(current, "day");

              if (diff < 0) return "خلصت 🎉";

              return `فاضل ${diff} يوم`;
            },
          },
        ],
      ],
    );

    return () => cal.destroy();
  }, [startDate, endDate]);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="text-white mb-4 text-lg font-semibold">تقويم الخدمة</h2>

      <div className="heatmap-wrapper">
        <div ref={calRef} />

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
