import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Stock Index",
  description: "好きな銘柄を選んで自分だけの株価指数を作る学習用アプリ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
