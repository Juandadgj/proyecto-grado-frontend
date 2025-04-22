"use client"
import { logout } from '@/services';
import { getAccessToken } from '@/services/auth.service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const toggleOpen = () => setOpen(!open);
  const handleLogout = async () => {
    await logout();
    router.push('/');
  }


  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessToken()
      if (!token) {
        return
      }
      const user = jwtDecode(token)
      setUser(user)
    }

    fetchData()
  }, [])

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-[256px]">
      <div
        className={`flex flex-col w-full md:w-64 text-gray-700 bg-[#00C1FF]  flex-shrink-0`}
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
          {/* <Link href="/dashboard" className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg focus:outline-none focus:shadow-outline">
            Helpear
          </Link> */}
          <h1 className="text-base font-semibold tracking-widest text-white uppercase rounded-lg focus:outline-none focus:shadow-outline">!Bienvenido de nuevo {user?.username}!</h1>
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
            className="flex flex-row items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] rounded-lg hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="/dashboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            Inicio
          </Link>

          <div className="relative">
            <button
              className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-white text-left bg-transparent bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] rounded-lg md:block hover:text-white focus:text-white0 hover:bg-gray-200 focus:bg-[#00C1FF] focus:outline-none focus:shadow-outline"
              onClick={toggleOpen}
            >
              <span className='flex flex-row items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
              </svg>

                Unidades
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className={`inline w-4 h-4 ml-1 transition-transform duration-200 transform ${open ? 'rotate-180' : 'rotate-0'}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {open && (
              <div
                className="absolute right-0 w-full text-white mt-2 origin-top-right rounded-md shadow-lg"
              >
                <div className="px-2 py-2 bg-[#00C1FF] rounded-md shadow ">
                  {/* <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={toggleOpen}
                    href="/dashboard/games"
                  >
                    1° Grado
                  </Link>
                  <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={toggleOpen}
                    href="/dashboard/games"
                  >
                    2° Grado
                  </Link> */}
                  <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={toggleOpen}
                    href="/dashboard/games"
                  >
                    Unidad #1
                  </Link>
                  {/* <Link
                    className="block bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-white focus:text-white hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={toggleOpen}
                    href="/dashboard/games"
                  >
                    4° Grado
                  </Link> */}
                </div>
              </div>
            )}
          </div>
          <Link
            className="flex flex-row items-center px-4 py-2 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] rounded-lg  hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href="/dashboard/categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6 h-6 mr-3">
              <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
            </svg>
            Configuración
          </Link>
        </nav>
        <div className='px-4 pb-5 text-white space-x-2 flex flex-row items-center w-full '>
          {user?.image ? <Image
            src={user?.image}
            alt="Descripción de la imagen"
            width={60}   // Especifica el ancho de la imagen
            height={60}  // Especifica la altura de la imagen
            className='rounded-[20%]'
          /> :
            <img className='rounded-[20%] w-11 h-11' src="/deaf.png" alt="" />
          }
          <div className='h-11 w-full flex-col justify-center items-center'>
            <h2 className='font-normal text-sm'>{user?.username}</h2>
            <p className='text-[10px]'>Estudiante</p>
          </div>
          <div className='h-10 flex-col justify-center items-center'>
            {/* <Link href="/"> */}
            <button onClick={handleLogout}>
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