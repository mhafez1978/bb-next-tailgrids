"use client";
import { usePathname } from "next/navigation";

const GetPageName = () => {
  const path = usePathname();
  const title: string = path.substring(1);
  return title;
};

export default GetPageName;
