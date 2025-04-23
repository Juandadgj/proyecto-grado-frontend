import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from '../../components/Navbar';
import "../globals.css";

const poppins = Poppins({ weight: ['400', '700'], preload: false });

export const metadata: Metadata = {
  title: "ABClick",
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
          <Navbar />
          {children}
      </body>
    </html>
  );
}
