import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { AiOutlineMenu } from 'react-icons/ai'
import { URLS, NAV_LIST } from '~/lib/utils/constants'

interface NavbarProps {
  scrollingRef: React.RefObject<HTMLDivElement>
}

const Navbar = ({ scrollingRef }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const mainDom = window.document.getElementById('main') ?? window

    const handleScroll = () => {
      const scrollY = scrollingRef.current?.scrollTop ?? 0
      if (scrollY >= 90) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    mainDom.addEventListener('scroll', handleScroll)
    return () => {
      mainDom.removeEventListener('scroll', handleScroll)
    }
  }, [scrollingRef])

  return (
    <>
      <nav
        className={
          'fixed left-0 top-0 z-10 w-full border-gray-200 duration-200 ease-in dark:border-gray-600 ' +
          (isScrolled ? 'backdrop-blur-2xl' : 'none')
        }
      >
        <div className="flex w-full items-center justify-between px-8 py-6 lg:px-50 lg:py-7">
          <Link href="/" className="w-32 lg:w-43.25">
            <Image
              src="/logo-blue.png"
              width="173"
              height="56"
              alt="Logo"
              loading="eager"
            />
          </Link>
          <div className="flex items-center justify-between lg:w-114">
            <div
              className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
              id="navbar-sticky"
            >
              <ul className="mt-0 flex w-64.5 items-center justify-between rounded-lg font-medium md:mx-5">
                {NAV_LIST.map((navItem, index) => (
                  <li
                    key={`${navItem.name}-${index}`}
                  >
                    <Link
                      href={navItem.path}
                      target="_blank"
                      className="py-2 pl-3 pr-4 text-lg text-black hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#2E79DC]"
                    >
                      {navItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:order-2">
              <Link href={URLS.app} target="_blank">
                <button
                  type="button"
                  className="hidden h-12 w-29 rounded-xl bg-[#2E79DC] text-center text-base font-medium text-white dark:bg-blue-600 dark:hover:bg-[#2E79DC] md:block"
                >
                  Enter App
                </button>
              </Link>
              <button
                className="mb-2 text-[#2e91dc] hover:text-[#2E79DC] md:hidden"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineMenu size={40} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={
          'shaow-xl fixed top-0 z-20 flex h-screen w-[75%] flex-col items-center p-6 backdrop-blur-3xl duration-500 ease-in-out lg:hidden ' +
          (isOpen ? 'right-0' : 'right-[-75%]')
        }
      >
        <div className="item-center flex w-full justify-end">
          <button
            className="mb-2 text-gray-600 hover:text-[#2E79DC]"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose size={36} />
          </button>
        </div>
        <ul className="mb-6 flex w-full flex-col">
          {NAV_LIST.map((navItem, index) => (
            <Link
              key={`${navItem.name}-${index}`}
              href={navItem.path}
              className="h-full w-full"
              target="_blank"
            >
              <li className="w-full">
                <div className="my-2 w-full rounded px-4 py-2.5 text-2xl text-[#2E79DC] hover:bg-gray-100">
                  {navItem.name}
                </div>
                <div className="mx-4 border-[1px] border-dashed border-gray-500" />
              </li>
            </Link>
          ))}
        </ul>
        <Link href={URLS.app} target="_blank">
          <button
            className="rounded-lg bg-[#2E79DC] px-8 py-2.5 text-center text-xl font-medium text-white dark:bg-blue-600 dark:hover:bg-[#2E79DC]"
          >
            Enter App
          </button>
        </Link>
      </div>
    </>
  )
}

export default Navbar
