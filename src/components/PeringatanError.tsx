import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PropsPeringatan {
  pesan: string;
}

export default function PeringatanError({ pesan }: PropsPeringatan) {
  // Jika tidak ada pesan error, komponen tidak akan me-render apa pun (kosong)
  if (!pesan) return null;

  return (
    <Alert
      variant="destructive"
      className="bg-red-50 border-red-200 text-red-800 shadow-sm rounded-xl py-3 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-bold text-sm">Login gagal</AlertTitle>
      <AlertDescription className="text-xs mt-0.5 font-medium opacity-90">
        {pesan}
      </AlertDescription>
    </Alert>
  );
}