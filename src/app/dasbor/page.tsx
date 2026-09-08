"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import dataPenjualan from "@/data/dataPenjualan.json";
import { DataPenjualan } from "@/type/tipePenjualan";
import HeaderDasbor from "@/components/HeaderDasbor";
import KartuRingkasan from "@/components/KartuRingkasan";
import GrafikEfektivitas from "@/components/GrafikEfektivitas";
import TabelSales from "@/components/TabelSales";

export default function HalamanDasbor() {
  const router = useRouter();
  const [namaPengguna, setNamaPengguna] = useState<string>("");
  const [kataKunciPencarian, setKataKunciPencarian] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const nama = localStorage.getItem("namaPengguna");

    if (!token) {
      router.push("/login");
    } else {
      setNamaPengguna(nama || "Supervisor");
    }
  }, [router]);

  const prosesLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const metrik = useMemo(() => {
    const dataValid = dataPenjualan as DataPenjualan[];
    const totalKunjungan = dataValid.reduce(
      (acc, curr) => acc + curr.kunjungan_realisasi,
      0,
    );
    const totalOrder = dataValid.reduce(
      (acc, curr) => acc + curr.total_order_rp,
      0,
    );
    const rataEfektivitas =
      dataValid.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0) /
      dataValid.length;

    return {
      totalKunjungan,
      totalOrder,
      rataEfektivitas: Math.round(rataEfektivitas),
    };
  }, []);

  const dataTabelTersaring = useMemo(() => {
    const dataValid = dataPenjualan as DataPenjualan[];
    return dataValid.filter(
      (sales) =>
        sales.nama_sales
          .toLowerCase()
          .includes(kataKunciPencarian.toLowerCase()) ||
        sales.area.toLowerCase().includes(kataKunciPencarian.toLowerCase()),
    );
  }, [kataKunciPencarian]);

  if (!namaPengguna) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 selection:text-blue-900">
      <HeaderDasbor namaPengguna={namaPengguna} onLogout={prosesLogout} />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <KartuRingkasan
          totalKunjungan={metrik.totalKunjungan}
          rataEfektivitas={metrik.rataEfektivitas}
          totalOrder={metrik.totalOrder}
        />

        <GrafikEfektivitas data={dataPenjualan as DataPenjualan[]} />

        <TabelSales
          data={dataTabelTersaring}
          kataKunciPencarian={kataKunciPencarian}
          setKataKunciPencarian={setKataKunciPencarian}
        />
      </main>
    </div>
  );
}
