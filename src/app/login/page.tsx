"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target, AlertCircle, User, Lock } from "lucide-react";

export default function HalamanLogin() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [pesanError, setPesanError] = useState("");
  const [sedangMemuat, setSedangMemuat] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError("");
    setSedangMemuat(true);

    try {
      const respons = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await respons.json();

      if (!respons.ok) {
        throw new Error(data.message || "Password atau username salah.");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem(
        "namaPengguna",
        `${data.firstName} ${data.lastName}`,
      );

      // PERBAIKAN: Menggunakan window.location.replace untuk membersihkan cache navigasi
      window.location.replace("/dasbor");
    } catch (error: any) {
      setPesanError(error.message || "Terjadi kesalahan pada sistem.");
    } finally {
      setSedangMemuat(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-950 flex items-center justify-center relative overflow-hidden font-sans selection:bg-blue-900 selection:text-white px-4">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/30 blur-[120px] rounded-full pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-800/50 blur-[120px] rounded-full pointer-events-none mix-blend-overlay" />

      <div className="w-full max-w-md relative z-10 bg-white border border-white shadow-2xl shadow-blue-950/50 rounded-[1.5rem] p-8 md:p-10 flex flex-col items-center transition-all">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
          <span className="text-white font-black text-3xl tracking-tighter">
            D.
          </span>
        </div>

        <div className="text-center mb-8 w-full">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
            Selamat datang!
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Masuk untuk memantau performa{" "}
            <span className="text-slate-700 font-bold">tim sales</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          {pesanError && (
            <Alert
              variant="destructive"
              className="bg-red-50 border-red-200 text-red-800 shadow-sm rounded-xl py-3"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold text-sm">Login gagal</AlertTitle>
              <AlertDescription className="text-xs mt-0.5 font-medium opacity-90">
                {pesanError}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2.5">
            <Label
              htmlFor="username"
              className="text-xs font-bold text-slate-600 pl-1 uppercase tracking-wider"
            >
              Username
            </Label>
            <div className="relative group">
              <User className="absolute left-3.5 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-11 h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label
              htmlFor="password"
              className="text-xs font-bold text-slate-600 pl-1 uppercase tracking-wider"
            >
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-11 h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all rounded-xl shadow-sm font-medium text-lg tracking-widest"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={sedangMemuat}
            className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {sedangMemuat ? "Memproses..." : "Masuk ke Dashboard"}
          </Button>
        </form>

        <p className="text-xs text-slate-400 mt-8 text-center leading-relaxed">
          Dashboard Analisa Performa Salesman{" "}
          <span className="font-semibold text-slate-500">Distrilink SAP</span>.
        </p>
      </div>
    </main>
  );
}
