import { useState, useEffect } from "react";
import { getServiceStats } from "../utils/serviceStats";
import dayjs from "dayjs";

// helper: تحويل أرقام إنجليزي → عربي
const toArabicNumbers = (number) => {
  return number.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
};

const StatsCards = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [progressPercent, setProgressPercent] = useState(0);

  // 🟢 Live countdown + progress
  useEffect(() => {
    if (!startDate || !endDate) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const end = dayjs(endDate);

      let diff = end.diff(now, "second"); // إجمالي الثواني المتبقية
      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (24 * 3600));
      const hours = Math.floor((diff % (24 * 3600)) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setTimeLeft({ days, hours, minutes, seconds });

      // نسبة progress live
      const { totalDays, passedDays } = getServiceStats(startDate, endDate);
      const nowPassed =
        totalDays - (days + hours / 24 + minutes / 1440 + seconds / 86400);
      const progress = Math.min((nowPassed / totalDays) * 100, 100);
      setProgressPercent(progress);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const { totalDays, passedDays, remainingDays, progress } = getServiceStats(
    startDate,
    endDate,
  );

  const Card = ({ title, value, liveProgress }) => (
    <div className="bg-zinc-900 p-4 rounded-2xl text-center">
      <p className="text-zinc-400 text-sm">{title}</p>
      <p className="text-white text-2xl font-bold mt-2">{value}</p>

      {liveProgress !== undefined && (
        <div className="w-full bg-zinc-700 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className="h-2 bg-emerald-500 transition-all duration-500"
            style={{ width: `${liveProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );

  const arabicProgress = `${toArabicNumbers(progress)}٪`;
  const arabicTime = `${toArabicNumbers(timeLeft.days)}ي ${toArabicNumbers(timeLeft.hours)}س ${toArabicNumbers(timeLeft.minutes)}د ${toArabicNumbers(timeLeft.seconds)}ث`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card title="إجمالي الأيام" value={toArabicNumbers(totalDays)} />
      <Card title="الأيام المنتهية" value={toArabicNumbers(passedDays)} />
      <Card title="الأيام المتبقية" value={toArabicNumbers(remainingDays)} />
      <Card title="نسبة الإنجاز" value={arabicProgress} />
      <Card title="الوقت المتبقي" value={arabicTime} />
    </div>
  );
};

export default StatsCards;
