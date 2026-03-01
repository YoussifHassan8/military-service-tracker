import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getServiceStats } from "../utils/serviceStats";

const ProgressChart = ({ startDate, endDate }) => {
  const { passedDays, remainingDays, progress } = getServiceStats(
    startDate,
    endDate,
  );

  const data = [
    { name: "تم", value: passedDays },
    { name: "متبقي", value: remainingDays },
  ];

  const COLORS = ["#10b981", "#27272a"];

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="text-white mb-4 text-lg font-semibold">نسبة الإنجاز</h2>

      <div className="relative w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
