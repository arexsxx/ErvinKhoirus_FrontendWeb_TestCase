import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, MapPin } from "lucide-react";
import { formatRupiah } from "@/lib/formatRupiah";
import { DataPenjualan } from "@/type/tipePenjualan";

interface PropsTabel {
  data: DataPenjualan[];
  kataKunciPencarian: string;
  setKataKunciPencarian: (val: string) => void;
}

export default function TabelSales({
  data,
  kataKunciPencarian,
  setKataKunciPencarian,
}: PropsTabel) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm shadow-slate-200/50 p-4 sm:p-8 transition-all border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Rincian Performa Salesman
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Pantau produktivitas individu dan status stok kosong (OOS).
          </p>
        </div>

        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type="text"
            placeholder="Cari nama sales atau area..."
            className="pl-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white border-slate-200 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/20 shadow-sm transition-all rounded-xl font-medium text-xs sm:text-sm w-full"
            value={kataKunciPencarian}
            onChange={(e) => setKataKunciPencarian(e.target.value)}
          />
        </div>
      </div>

      {/* Kontainer Tabel */}
      <div className="w-full overflow-x-auto rounded-[1rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <Table className="min-w-162.5">
          <TableHeader className="bg-slate-50/80 dark:bg-slate-900/50">
            <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="font-bold text-slate-700 h-12 text-xs sm:text-sm">
                Nama Salesman
              </TableHead>
              <TableHead className="font-bold text-slate-700 h-12 text-xs sm:text-sm">
                Area
              </TableHead>
              <TableHead className="font-bold text-slate-700 h-12 text-center text-xs sm:text-sm">
                Realisasi / Rencana
              </TableHead>
              <TableHead className="font-bold text-slate-700 h-12 text-center text-xs sm:text-sm">
                Efektivitas
              </TableHead>
              <TableHead className="font-bold text-slate-700 h-12 text-right text-xs sm:text-sm">
                Total Order
              </TableHead>
              <TableHead className="font-bold text-slate-700 h-12 text-center text-xs sm:text-sm">
                OOS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((sales, index) => (
                <TableRow
                  key={index}
                  className="border-slate-100 dark:border-slate-800 hover:bg-blue-50/40 dark:hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <TableCell className="font-bold text-slate-800 dark:text-slate-200 py-4 text-xs sm:text-sm whitespace-nowrap">
                    {sales.nama_sales}
                  </TableCell>
                  <TableCell className="py-4 text-xs sm:text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{sales.area}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4 text-xs sm:text-sm whitespace-nowrap">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {sales.kunjungan_realisasi}
                    </span>
                    <span className="text-slate-400 mx-1.5 font-medium">/</span>
                    <span className="text-slate-500 font-medium">
                      {sales.kunjungan_planned}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide ${
                        sales.efektivitas_visit_persen >= 80
                          ? "bg-emerald-100 text-emerald-700"
                          : sales.efektivitas_visit_persen >= 60
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sales.efektivitas_visit_persen}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-800 dark:text-slate-200 py-4 text-xs sm:text-sm whitespace-nowrap">
                    {formatRupiah(sales.total_order_rp)}
                  </TableCell>
                  <TableCell className="text-center py-4 whitespace-nowrap">
                    {sales.jumlah_order_oos > 0 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-red-100 text-red-600 rounded-full font-bold text-xs">
                        {sales.jumlah_order_oos}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
                  <p className="text-slate-500 font-medium text-xs sm:text-sm">
                    Data salesman tidak ditemukan.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
