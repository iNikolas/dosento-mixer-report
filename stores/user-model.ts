import { createStore, createEvent, sample } from "effector";
import { createGate } from "effector-react";

import {
  getUserDataFx,
  logoutFx,
  redirectFx,
  showErrorMessageFx,
} from "@/effects";
import { links } from "@/config";
import { User } from "@/entities";

export const Gate = createGate();

export const logoutRequested = createEvent();
export const fetchUserDataRequested = createEvent();

export const $currentUser = createStore<User | null>(null);

sample({
  clock: Gate.open,
  source: $currentUser,
  filter: (user) => !user,
  target: fetchUserDataRequested,
});

sample({ clock: fetchUserDataRequested, target: getUserDataFx });

sample({ clock: getUserDataFx.doneData, target: $currentUser });

sample({ clock: logoutRequested, target: logoutFx });

sample({ clock: logoutFx.done, fn: () => links.login, target: redirectFx });

sample({ clock: logoutFx.done, fn: () => null, target: $currentUser });

sample({ clock: logoutFx.failData, target: showErrorMessageFx });

sample({ clock: getUserDataFx.failData, target: showErrorMessageFx });
