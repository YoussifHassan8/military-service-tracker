import { useEffect, useRef, useCallback } from "react";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import dayjs from "dayjs";
import "cal-heatmap/cal-heatmap.css";

const Heatmap = ({ startDate, endDate }) => {
  const containerRef = useRef(null);
  const calRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const paintCalendar = useCallback(() => {
    if (!containerRef.current || !startDate || !endDate) return;

    if (calRef.current) {
      calRef.current.destroy();
    }

    const cal = new CalHeatmap();
    calRef.current = cal;

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
        itemSelector: containerRef.current,
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
  }, [startDate, endDate]);

  useEffect(() => {
    paintCalendar();

    return () => {
      if (calRef.current) {
        calRef.current.destroy();
      }
    };
  }, [paintCalendar]);

  useEffect(() => {
    if (!containerRef.current) return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        paintCalendar();
      }, 150);
    };

    resizeObserverRef.current = new ResizeObserver(handleResize);
    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [paintCalendar]);

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl w-full overflow-x-auto max-w-75">
      <h2 className="text-white mb-4 text-lg font-semibold">تقويم الخدمة</h2>

      {/* ✅ Scroll container is isolated from the outer padding/rounded styles */}
      <div className="overflow-x-auto">
        <div className="heatmap-wrapper min-w-75">
          <div ref={containerRef} />

          <style>{`
            .heatmap-wrapper .ch-domain-text {
              fill: white !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
