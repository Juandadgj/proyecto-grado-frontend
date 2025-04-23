"use client";
import { getAccessToken } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchData();
  }, []);
  return (
    <nav className="bg-white w-full flex justify-between items-center h-20 pl-9 px-8">
      <div className="flex">
        <Image
          src="/deaf.png"
          alt="Descripción de la imagen"
          width={80} // Especifica el ancho de la imagen
          height={80} // Especifica la altura de la imagen
        />
        <h1 className="flex items-center font-extrabold text-4xl text-[#00cef8]">
          Helpear
        </h1>
      </div>

      <div className="hidden md:flex items-center space-x-1">
        <Link
          href="/"
          className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
        >
          Inicio
        </Link>
        <Link
          href="/#advantages"
          className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
        >
          Ventajas
        </Link>
        <Link
          href="/#courses"
          className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
        >
          Categorías
        </Link>
        {!accessToken ? (
          <>
            <Link
              href="/auth/login"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-full border-2 border-black hover:border-blue-500 text-lg font-semibold"
            >
              Iniciar sesión
            </Link>
          </>
        ) : (
          <Link
            href="/dashboard"
            className="text-[#00cef8] hover:text-blue-500 px-3 py-2 rounded-md text-lg font-bold"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button className="mobile-menu-button"></button>
      </div>

      <div className="mobile-menu hidden">
        <a
          href="#"
          className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200"
        >
          Home
        </a>
        <a
          href="#"
          className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200"
        >
          About
        </a>
        <a
          href="#"
          className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200"
        >
          Services
        </a>
        <a
          href="#"
          className="block text-sm px-2 py-4 text-gray-800 hover:bg-gray-200"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
