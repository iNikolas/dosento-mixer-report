import { createStore, createEvent, sample } from "effector";
import { User } from "firebase/auth";

import { logoutFx, showErrorMessageFx } from "@/effects";

export const logoutRequested = createEvent();
export const authStateChanged = createEvent<User | null>();

export const $currentUser = createStore<User | null>(null);

sample({ clock: authStateChanged, target: $currentUser });
sample({ clock: logoutRequested, target: logoutFx });

sample({ clock: logoutFx.failData, target: showErrorMessageFx });
