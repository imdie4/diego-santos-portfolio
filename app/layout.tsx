import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import "./globals.css";

const SITE_URL = "https://diegosantosportfolio.vercel.app";
const DESCRIPTION =
  "Portfólio de Diego Santos, designer de produto: criando produtos digitais a partir de problemas e pessoas reais.";

export const metadata: Metadata = {
  // absolute base for the share image (app/opengraph-image.png)
  metadataBase: new URL(SITE_URL),
  title: "Diego Santos - Portfolio",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Diego Santos - Portfolio",
    title: "Diego Santos - Portfolio",
    description: DESCRIPTION,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Santos - Portfolio",
    description: DESCRIPTION,
  },
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
          <main className="min-h-screen overflow-x-clip pb-24 pt-28 md:pb-0 md:pt-32">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
