import React from "react";
import Link from "next/link";

import BurgerIcon from "@/assets/icons/burger.svg";

import { Links } from "./components";

export function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
            <BurgerIcon className="h-5 w-5" />
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <Links />
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          ТОВ &quot;ДОСЕНТО ПОЛІМЕР&quot;
        </Link>
      </div>
      <div className="navbar-end hidden sm:flex">
        <ul className="menu menu-horizontal px-1">
          <Links />
        </ul>
      </div>
    </nav>
  );
}
