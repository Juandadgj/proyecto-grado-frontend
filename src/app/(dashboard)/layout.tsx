import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// import Navbar from '../components/Navbar';
import "../globals.css";
import Sidebar from '../../components/Sidebar';
import Provider from "../Provider";

const poppins = Poppins({ weight: ['400', '700'], preload: false });

export const metadata: Metadata = {
  title: "Helpear",
  description: "Plataforma web para enseñar a niños con discapacidad auditiva el español comosegunda lengua",
  keywords: "español, discapacidad auditiva, aprender, enseñanza, español"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Provider>
        <div className="flex">
          <Sidebar/>
          {children}
        </div>
        </Provider>

      </body>
    </html>
  );
}
