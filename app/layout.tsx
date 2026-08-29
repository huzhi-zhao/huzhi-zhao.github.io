import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-heading",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const title = "Huzhi (James) Zhao — Senior Backend Engineer";
const description =
  "Huzhi (James) Zhao — Senior Backend Engineer with 9 years building distributed systems where scale, performance and data reliability matter, now extending into Data Engineering and Applied AI.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description:
      "9 years building distributed systems where scale, performance and data reliability matter. Now extending into Data Engineering and Applied AI.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23141414'/%3E%3Ctext x='32' y='41' font-family='monospace' font-size='24' font-weight='700' fill='%231dbf73' text-anchor='middle'%3EHZ%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${manrope.variable} ${inter.variable} ${jetbrains.variable} font-body text-[16px] leading-relaxed text-white`}
      >
        {children}
      </body>
    </html>
  );
}
