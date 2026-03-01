import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import dayjs from "dayjs";

const TimelineProgress = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  const totalDays = (end - start) / (1000 * 60 * 60 * 24);
  let passedDays = (today - start) / (1000 * 60 * 60 * 24);

  if (passedDays < 0) passedDays = 0;
  if (passedDays > totalDays) passedDays = totalDays;

  const progress = (passedDays / totalDays) * 100;

  return (
    <div className="bg-zinc-800 p-6 rounded-2xl">
      <h2 className="text-white mb-2 text-lg font-semibold">خط التقدم</h2>
      <div className="w-full bg-zinc-700 h-6 rounded-full overflow-hidden">
        <div
          className="h-6 bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white mt-2 text-sm text-right">
        {Math.floor(progress)}% مكتمل ({Math.floor(passedDays)} من{" "}
        {Math.floor(totalDays)} يوم)
      </p>
    </div>
  );
};

export default TimelineProgress;
