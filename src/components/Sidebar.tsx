"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const {data: session} = useSession();
  const userImage = session?.user?.image || '/alex.jpg';

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-[256px]">
      <div
        className={`flex flex-col w-full md:w-64 text-gray-700 bg-[#00C1FF] dark:text-white dark:bg-gray-800 flex-shrink-0`}
      >
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <Link href="/dashboard">
            <Image
              src="/deaf.png"
              alt="Descripción de la imagen"
              width={80}   // Especifica el ancho de la imagen
              height={80}  // Especifica la altura de la imagen
              className='rounded-[50%]'
            />
          </Link>
          <Link href="/dashboard" className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline">
            Helpear
          </Link>
          <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={toggleOpen}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        <nav className={`flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ${open ? 'block' : 'hidden'}`}>

          <Link
            className="flex flex-row items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="/dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            Inicio
          </Link>

          <Link
            className="flex flex-row items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white  hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="/dashboard/categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
            </svg>

            Categorías
          </Link>
          <div className="relative">
            <button
              className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:block hover:text-white focus:text-white0 hover:bg-gray-200 focus:bg-[#00C1FF] focus:outline-none focus:shadow-outline"
              onClick={toggleOpen}
            >
              <span className='flex flex-row items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
              </svg>

                Categorías
              </span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${open ? 'rotate-180' : 'rotate-0'}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {open && (
              <div
                className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg"
              >
                <div className="px-2 py-2 bg-[#00C1FF] rounded-md shadow dark:bg-white">
                  <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-white md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    6-8 años
                  </Link>
                  <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-white md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    9-11 años
                  </Link>
                  <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-white md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    href="#"
                  >
                    12-15 años
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className='px-4 pb-5 text-white space-x-2 flex flex-row'>
          {/* <Image
            src={userImage}
            alt="Descripción de la imagen"
            width={40}   // Especifica el ancho de la imagen
            height={40}  // Especifica la altura de la imagen
            className='rounded-[20%]'
          /> */}
          <img className='rounded-[20%] w-11 h-11' src={userImage} alt="" />
          <div>
            <h2 className='font-normal text-sm'>{session?.user?.name}</h2>
            <p className='text-[10px]'>Estudiante</p>
          </div>
          <div>
            {/* <Link href="/"> */}
            <button onClick={() =>{
              signOut({
                callbackUrl:'/',
              })
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
              </button>
            {/* </Link> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;