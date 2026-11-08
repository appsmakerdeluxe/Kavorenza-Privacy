import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavorenza – Datenschutzerklärung",
  description: "Datenschutzerklärung für Kavorenza.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
