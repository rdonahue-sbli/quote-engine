import { Logo } from "./_components/Logo";
import { ClientProvider } from "./_trpc/provider";
import "./globals.css";
import { Inter, Merriweather, Assistant } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--merriweather-font",
  weight: ["400", "700", "900"],
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--assistant-font",
  weight: ["400", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Demo SBLI App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} ${assistant.variable} flex h-screen flex-col bg-white`}
    >
      <body className="font-assistant">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
