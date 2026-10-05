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
    // suppressHydrationWarning: the script below may add `dark` before React loads
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint, so dark mode never
            flashes light on load. Default is light. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen overflow-x-clip pt-32">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
