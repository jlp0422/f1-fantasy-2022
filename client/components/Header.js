import Dismiss from 'components/icons/Dismiss'
import Hamburger from 'components/icons/Hamburger'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import headerLogo from '../public/fate-eight.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useRouter()
  const routes = [
    { href: '/', title: 'Standings' },
    { href: '/constructors', title: 'Constructors' },
    { href: '/race-points', title: 'Points by Race' },
  ]

  return (
    <nav
      className="relative z-10 px-2 py-6 bg-gray-800 border-gray-200 md:px-8"
      style={{ backgroundColor: '#171420' }}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto max-w-7xl">
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="absolute inline-flex items-center p-2 text-sm text-gray-400 rounded-lg md:hidden focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600 xs:top-4 sm:top-4"
          style={isOpen ? { top: 11 } : {}}
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <Dismiss /> : <Hamburger />}
        </button>
        <div className="flex items-center justify-center mx-auto md:w-auto md:flex-1 md:justify-start">
          <Link href="/">
            <a className="leading-[0rem] max-w-[200px] xs:max-w-[300px] sm:max-w-[450px]">
              <Image
                layout="intrinsic"
                src={headerLogo}
                alt="Fate of the Eight"
              />
            </a>
          </Link>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-6 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {routes.map(({ href, title }) => {
              const isActiveRoute = pathname === href
              return (
                <li key={href}>
                  <Link href={href}>
                    <a
                      className={`font-secondary uppercase block px-3 py-2 border-b md:border-0 md:p-0 text-lg lg:text-xl md:hover:text-white hover:bg-gray-700 hover:text-gray-200 md:hover:bg-transparent border-gray-700 ${
                        isActiveRoute ? 'text-white' : 'text-gray-400'
                      }`}
                      onClick={() => setIsOpen((open) => !open)}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
