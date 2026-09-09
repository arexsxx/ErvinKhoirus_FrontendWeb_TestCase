"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, CircleDollarSign } from "lucide-react";
import { formatRupiah } from "@/lib/formatRupiah";

interface PropsKartu {
  totalKunjungan: number;
  rataEfektivitas: number;
  totalOrder: number;
}

export default function KartuRingkasan({
  totalKunjungan,
  rataEfektivitas,
  totalOrder,
}: PropsKartu) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {/* card-1 */}
      <Card className="border-0 shadow-sm shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 bg-white dark:bg-slate-900 group rounded-[1.5rem]">
        <CardContent className="p-5 sm:p-7 flex items-center gap-4 sm:gap-5">
          <div className="p-3.5 sm:p-4 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-[1rem] shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300 shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1 truncate">
              Total Kunjungan Hari Ini
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              {totalKunjungan}{" "}
              <span className="text-xs sm:text-sm font-semibold text-slate-400 tracking-normal">
                Outlet
              </span>
            </h3>
          </div>
        </CardContent>
      </Card>
      {/* card-2 */}
      <Card className="border-0 shadow-sm shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 transition-all duration-300 bg-white dark:bg-slate-900 group rounded-[1.5rem]">
        <CardContent className="p-5 sm:p-7 flex items-center gap-4 sm:gap-5">
          <div className="p-3.5 sm:p-4 bg-linear-to-br from-emerald-400 to-emerald-500 text-white rounded-[1rem] shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300 shrink-0">
            <Target className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1 truncate">
              Rata-rata Efektivitas
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
              {rataEfektivitas}%
            </h3>
          </div>
        </CardContent>
      </Card>
      {/* card-3 */}
      <Card
        onClick={() => setIsExpanded(!isExpanded)}
        className="border-0 shadow-sm shadow-slate-200/50 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1.5 transition-all duration-300 bg-white dark:bg-slate-900 group rounded-[1.5rem] cursor-pointer select-none"
        title="Klik untuk melihat nominal penuh"
      >
        <CardContent className="p-5 sm:p-7 flex items-center gap-4 sm:gap-5">
          <div className="p-3.5 sm:p-4 bg-linear-to-br from-violet-500 to-violet-600 text-white rounded-[1rem] shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300 shrink-0">
            <CircleDollarSign
              className="w-5 h-5 sm:w-6 sm:h-6"
              strokeWidth={2.5}
            />
          </div>
          <div className="min-w-0 overflow-hidden flex-1">
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1 truncate">
              Total Nilai Order
            </p>
            <h3
              className={`font-extrabold tracking-tight text-slate-800 dark:text-slate-100 transition-all ${
                isExpanded
                  ? "text-base sm:text-lg break-all"
                  : "text-lg sm:text-xl xl:text-2xl truncate"
              }`}
            >
              {formatRupiah(totalOrder)}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
