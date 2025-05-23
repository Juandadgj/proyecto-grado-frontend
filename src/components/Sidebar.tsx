'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { deleteSession } from '@/lib/auth/session'
import { getAccessToken } from '@/services/auth.service'

interface DecodedUser {
  username: string
  image?: string
}

const Sidebar = ({user}:any) => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleLogout = async () => {
    await deleteSession()
    router.push('/')
  }

  return (
    <aside className="flex flex-col w-60 md:w-64 min-h-screen bg-[#00C1FF] text-white">
      <div className="flex items-center justify-between p-4">
        <Link href="/dashboard">
          <Image
            src="/deaf.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </Link>
        <h1 className="text-sm font-semibold hidden md:block">
          ¡Bienvenido!
        </h1>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg viewBox="0 0 20 20" className="w-6 h-6">
            {menuOpen ? (
              <path
                fill="currentColor"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fill="currentColor"
                d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 5h14a1 1 0 010 2H3a1 1 0 010-2zm6 5h8a1 1 0 010 2H9a1 1 0 010-2z"
              />
            )}
          </svg>
        </button>
      </div>

      <nav className={`flex-grow px-4 pb-4 ${menuOpen ? 'block' : 'hidden'} md:block`}>
        <SidebarLink href="/dashboard" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        } label="Inicio" />
        <SidebarDropdown
          title="Unidades"
          icon={
            <span className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                />
              </svg>
            </span>
          }
          open={menuOpen}
        >
          <SidebarLink href="/dashboard/games" label="Unidad #1" />
        </SidebarDropdown>
        {/* <SidebarLink href="/dashboard/categories" icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6 h-6 mr-3">
          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
        </svg>} label="Configuración" /> */}
      </nav>

      <footer className="p-4 mt-auto flex items-center space-x-3">
        <Image
          src={user?.image || '/deaf.png'}
          alt="Usuario"
          width={40}
          height={40}
          className="rounded-xl"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user?.name}</span>
          <span className="text-xs">{user?.role === 'STUDENT' ? 'Estudiante' : 'Profesor'}</span>
        </div>
        <button onClick={handleLogout} className="ml-auto">
          <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </footer>
    </aside>
  )
}

export default Sidebar

const SidebarLink = ({ href, label, icon }: { href: string; label: string; icon?: any }) => (
  <Link
    href={href}
    className="block py-2 px-4 mt-2 rounded-lg bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] hover:bg-gray-100 text-sm"
  >
    <span className="flex items-center space-x-0">
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </span>
  </Link>
)

const SidebarDropdown = ({
  title,
  children,
  icon,
  open,
}: {
  title: string
  children: React.ReactNode,
  icon?: any
  open: boolean
}) => (
  <div className="relative">
    <button
      className="flex w-full items-center justify-between py-2 px-4 mt-2 rounded-lg bg-gradient-to-r from-[#00C1FF] to-[#11ffd762] text-sm hover:bg-gray-100"
    >
      {icon && <span>{icon}</span>}
      <span>{title}</span>
      <svg className={`w-4 h-4 transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z" />
      </svg>
    </button>
    <div className="ml-4">{children}</div>
  </div>
)
