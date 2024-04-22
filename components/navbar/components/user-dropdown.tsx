"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";

import { userModel } from "@/stores";
import { getAcronim } from "@/utils";

export function UserDropdown() {
  useGate(userModel.Gate);
  const logoutUserHandler = useUnit(userModel.logoutRequested);

  const user = useUnit(userModel.$currentUser);

  if (!user) {
    return null;
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <p className="bg-primary-content w-10 h-10 rounded-full flex justify-center items-center">
          {getAcronim(user.displayName)}
        </p>
      </div>
      <ul className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <button type="button" className="justify-between">
            Profile
            <span className="badge">New</span>
          </button>
        </li>
        <li>
          <button type="button">Settings</button>
        </li>
        <li>
          <button onClick={logoutUserHandler} type="button">
            Вийти
          </button>
        </li>
      </ul>
    </div>
  );
}
