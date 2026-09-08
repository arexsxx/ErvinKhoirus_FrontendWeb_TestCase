import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface PropsHeader {
  namaPengguna: string;
  onLogout: () => void;
}

export default function HeaderDasbor({ namaPengguna, onLogout }: PropsHeader) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/25 shrink-0">
            <span className="text-white font-black text-sm sm:text-base tracking-tighter">
              D.
            </span>
          </div>
          <h1 className="font-extrabold text-base sm:text-lg tracking-tight truncate">
            Distrilink <span className="text-blue-600">SAP</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 truncate">
            Halo,{" "}
            <span className="text-slate-900 dark:text-white font-bold">
              {namaPengguna}
            </span>
          </p>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="group relative px-3 sm:px-4 h-9 sm:h-10 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-300 rounded- font-bold active:scale-95 shrink-0 text-xs sm:text-sm"
          >
            <LogOut className="w-4 h-4 sm:mr-2 transition-transform duration-300 group-hover:-translate-x-0.5 text-slate-400 group-hover:text-white" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
