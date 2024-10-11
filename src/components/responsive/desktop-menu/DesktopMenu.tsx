"use client";
import React from "react";
import { AppPages02 } from "@/components/AppPages";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopMenu = ({ linkColor }: { linkColor: string }) => {
  const currentPath = usePathname();
  return (
    <ul
      className={`w-[90%] flex flex-row justify-end gap-4 uppercase items-center ${linkColor}`}
    >
      {AppPages02.map((page, index) => (
        <li
          key={index}
          className={
            currentPath === page.href
              ? "relative group text-sm font-black text-sky-600 hover:text-sky-600"
              : "relative group text-sm font-black hover:text-sky-600"
          }
        >
          <Link href={page.href} className="py-2">
            {page.pageTitle}
          </Link>

          {/* Check if the page has subPages and render the dropdown */}
          {page.subPages && (
            <ul className="absolute -left-10 top-full hidden mt-1 space-y-2 bg-white shadow-lg p-2 w-[260px] shadow-2xl bg-gray-300 text-black rounded-lg group-hover:flex flex-col">
              {page.subPages.map((subPage, subIndex) => (
                <li key={subIndex} className="text-[`4px`] font-normal">
                  <Link
                    href={subPage.href}
                    className={
                      currentPath === subPage.href
                        ? "block px-4 py-2 text-sky-600 hover:bg-gray-300 uppsecase"
                        : "block px-4 py-2 hover:bg-gray-300 uppercase"
                    }
                  >
                    {subPage.pageTitle}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;
