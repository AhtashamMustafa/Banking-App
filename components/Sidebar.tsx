"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-6">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-3">
          <Image
            src="./icons/logo.svg"
            width={35}
            height={35}
            alt="Horizon logo"
            className="size-[45px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">PayPass</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  fill
                  alt={item.label}
                  className={cn({"brightness-[3] invert-0": isActive })}
                />
              </div>
                <p className={cn('sidebar-label',{'!text-white':isActive})}>{item.label}</p>
            </Link>
          );
        })}

       <PlaidLink user={user} />
      </nav>

      <Footer user={user}/>
    </section>
  );
};

export default Sidebar;
