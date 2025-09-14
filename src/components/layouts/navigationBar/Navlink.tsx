"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import type { NavLink } from "../types";
import Logo from "@/components/shared/Logo";
import { toast } from "sonner";
import Cookies from "js-cookie";

import LoadingButton from "@/components/shared/LoadingBtn/LoadingButton";

interface MainNavLinkProps {
  navLink: NavLink[];
  additionalRoutes: NavLink[] | null;
  setIsShort: React.Dispatch<React.SetStateAction<boolean>>;
  isShort: boolean;
  dark?: boolean;
}

export default function MainNavLink({
  navLink,
  additionalRoutes,
  setIsShort,
  isShort,
  dark = false,
}: MainNavLinkProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const isActive = (href: string) => {
    const cleanHref = href.split("?")[0];
    const cleanPathname = pathname.split("?")[0];

    if (cleanHref === "/" || cleanHref === "/admin") {
      return cleanPathname === cleanHref;
    }
    return cleanPathname.startsWith(cleanHref);
  };

  const handleLogout = async () => {
    setIsLoading(true);

    setTimeout(() => {
      // localStorage.removeItem("accessToken");
      Cookies.remove("accessToken");
      toast.success("Logged out successfully");
      setIsLoading(false);
      router.push("/signIn"); // optional redirect
    }, 2000); // 2-second delay
  };
  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const renderNavLink = (
    link: NavLink,
    isShort: boolean,
    setIsShort: React.Dispatch<React.SetStateAction<boolean>>,
    dark?: boolean
  ) => {
    const hasSubItems = link.subItems && link.subItems.length > 0;

    return (
      <div key={link.name}>
        <div
          className={`flex items-center justify-between gap-3 px-3 py-3 rounded-md cursor-pointer ${isActive(link.href)
            ? "text-white" // text stays white
            : dark
              ? "text-white hover:bg-primary/40"
              : "hover:bg-primary/10 hover:text-primary"
            }`}
          style={
            isActive(link.href)
              ? {
                background:
                  "linear-gradient(12deg, #017AFF 37.44%, #61BDFF 67.11%)",
              }
              : {}
          }

          onClick={() => hasSubItems && toggleDropdown(link.name)}
          onMouseEnter={() => setIsShort(true)}
        >
          {hasSubItems ? (
            <button className="flex items-center gap-3 flex-1 overflow-hidden">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="13"
                viewBox="0 0 2 13"
                fill="none"
              >
                <path
                  d="M1 12.9531V0.453125"
                  stroke="#333333"
                  stroke-width="1.5"
                />
              </svg> */}

              {isShort && <span className="text-nowrap">{link.name}</span>}
            </button>
          ) : (
            <Link
              href={link.href}
              className="flex items-center gap-3 flex-1 overflow-hidden"
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="13"
                viewBox="0 0 2 13"
                fill="none"
              >
                <path
                  d="M1 12.9531V0.453125"
                  stroke="#333333"
                  stroke-width="1.5"
                />
              </svg> */}

              {link.icon && <link.icon className="min-w-6 min-h-6" />}
              {isShort && <span className="text-nowrap">{link.name}</span>}
            </Link>
          )}

          {hasSubItems && isShort && (
            <span className="text-sm">
              {openDropdown === link.name ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </span>
          )}
        </div>

        {hasSubItems && link.subItems && isShort && (
          <div
            className={`pl-6 transition-all duration-300 ease-in-out overflow-hidden ${openDropdown === link.name ? "max-h-96" : "max-h-0"
              }`}
          >
            {link.subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md overflow-hidden ${isActive(subItem.href)
                  ? "bg-primary text-white"
                  : dark
                    ? "text-white hover:bg-primary/40"
                    : "hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {isShort && <span className="text-nowrap">{subItem.name}</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen relative ${dark ? "bg-black" : "bg-white"
        }`}
    >
      <div className="lg:block absolute top-16 right-0 hidden z-50">
        <button
          className={`rounded-md transition-colors w-fit shadow-md px-3 z-50 ${dark ? "bg-primary" : "bg-white hover:bg-gray-100"
            }`}
          onClick={() => setIsShort(!isShort)}
          aria-label="Toggle menu"
        >
          {isShort ? (
            <LuChevronsRight
              className={`h-6 w-6 z-50 ${dark ? "hover:text-white" : "hover:text-primary"
                }`}
            />
          ) : (
            <LuChevronsLeft
              className={`h-6 w-6 z-50 ${dark ? "hover:text-white" : "hover:text-primary"
                }`}
            />
          )}
        </button>
      </div>

      {/* Logo Section */}
      <Link href="/" className="p-4 min-h-20">
        {isShort && (
          <div className="flex items-center gap-2">
            {/* Your SVG Logo here */}

            <Logo height={78} width={212} />
          </div>
        )}
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 mt-2">
        <div className="space-y-1">
          {navLink.map((link) =>
            renderNavLink(link, isShort, setIsShort, dark)
          )}
        </div>
      </nav>

      {/* Bottom: Extra routes + Logout */}
      <div className="mt-auto p-4 space-y-1">
        {additionalRoutes?.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-md ${isActive(link.href)
              ? "bg-primary text-white"
              : "hover:bg-primary/10"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="13"
              viewBox="0 0 2 13"
              fill="none"
            >
              <path
                d="M1 12.9531V0.453125"
                stroke="#333333"
                stroke-width="1.5"
              />
            </svg>
            {link.name}
          </Link>
        ))}

        <div
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer ${dark ? "hover:bg-primary/40" : "hover:bg-primary/10"
            }`}
        >
          <IoLogOut
            className={`min-w-6 min-h-6 ${dark ? "text-white" : "text-black"}`}
          />
          {isShort && (
            <span
              className={`text-nowrap ${dark ? "text-white" : "text-black"}`}
            >
              {isLoading ? (
                <>
                  <LoadingButton />
                </>
              ) : (
                "Log Out"
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
