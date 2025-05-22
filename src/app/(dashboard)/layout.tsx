import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getSessionFromServer } from "@/lib/auth/getSessionAction";
import "../globals.css";
import Sidebar from "../../components/Sidebar";
import { ConfigProvider } from "antd";
// import Provider from "../Provider";

const poppins = Poppins({ weight: ["400", "700"], preload: false });

export const metadata: Metadata = {
  title: "ABClick",
  description:
    "Plataforma web para enseñar a niños con discapacidad auditiva el español comosegunda lengua",
  keywords: "español, discapacidad auditiva, aprender, enseñanza, español",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getSessionFromServer();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 24,
                arrowOffset: 20,
              },
            },
          }}
        >
          <div className="flex h-screen">
            <Sidebar user={session} />
            <div className="overflow-auto flex-grow h-screen">{children}</div>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
