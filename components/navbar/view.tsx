import React from "react";
import Link from "next/link";

import BurgerIcon from "@/assets/icons/burger.svg";

import { Links, UserDropdown } from "./components";
import { ThemeToggle } from "../theme-toggle";

export function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
            <BurgerIcon className="h-5 w-5" />
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
            <Links />
            <li>
              <button type="button" className="w-fit p-0 ml-3 my-1">
                <ThemeToggle />
              </button>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          ТОВ &quot;ДОСЕНТО ПОЛІМЕР&quot;
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden sm:flex">
          <Links />
        </ul>
        <ThemeToggle className="mr-4 hidden sm:flex" />
        <UserDropdown />
      </div>
    </nav>
  );
}
