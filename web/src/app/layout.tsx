import type { Metadata } from "next";
import { Inconsolata, Montserrat } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inconsolata",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "D3.WORKS",
  description: "D3 Soluções Especializadas em Tecnologia da Informação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inconsolata.variable} ${montserrat.variable} font-inconsolata overflow-auto`}>
      <body
        className={`${inconsolata.variable} ${montserrat.variable} font-inconsolata`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-black">
            <div className="max-w-7xl mx-auto py-[24px] px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center h-[24px] w-auto">
                <Image
                  src="/assets/images/logos/d3-logo.svg"
                  alt="D3.Works"
                  width={161}
                  height={24}
                  priority
                  className="h-full w-auto"
                />
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <footer className="bg-[#141414]">
            <div className="max-w-7xl mx-auto py-[18px] px-4 sm:px-6 lg:px-8">
              <p className="text-center text-white text-[16px] leading-[20px]">
                Todos os direitos reservados. D3 Soluções Especializadas em
                Tecnologia da Informação LTDA.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
