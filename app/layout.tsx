import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diego Santos — Product Designer",
  description:
    "Portfólio de Diego Santos: criando produtos digitais a partir de problemas e pessoas reais.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen overflow-x-clip pt-32">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
