import React from "react";

const ServiceDialog = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-zinc-800 w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          أدخل بيانات خدمتك العسكرية
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Start Date */}
          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              تاريخ بداية الخدمة
            </label>
            <input
              type="date"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 text-sm text-zinc-400">
              تاريخ نهاية الخدمة
            </label>
            <input
              type="date"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 transition-all duration-200 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-600/20"
          >
            ابدأ العد التنازلي
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceDialog;
