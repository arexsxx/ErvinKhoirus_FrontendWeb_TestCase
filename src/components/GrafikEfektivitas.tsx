"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DataPenjualan } from "@/type/tipePenjualan";

export default function GrafikEfektivitas({ data }: { data: DataPenjualan[] }) {
  const dataGrafik = data.map((item) => ({
    nama: item.nama_sales.split(" ")[0],
    efektivitas: item.efektivitas_visit_persen,
  }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm shadow-slate-200/50 p-4 sm:p-8 transition-all border border-slate-100 dark:border-slate-800">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Perbandingan Efektivitas Kunjungan
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
          Persentase realisasi terhadap rencana per salesman.
        </p>
      </div>

      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dataGrafik}
            margin={{ top: 10, right: 10, left: -25, bottom: 25 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity={1} />/
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="nama"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
              dy={12}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                fontWeight: 600,
                padding: "10px 16px",
                fontSize: "12px",
              }}
            />

            <Bar
              dataKey="efektivitas"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
