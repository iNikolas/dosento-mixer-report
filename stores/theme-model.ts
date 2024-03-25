import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { persist } from "effector-storage/local";

import { changeDarkModeFx } from "@/effects";

export const Gate = createGate();

export const darkModeSelected = createEvent<boolean>();

export const $isDarkMode = createStore(true);

persist({ store: $isDarkMode, key: "dark-theme", pickup: Gate.open });

sample({ clock: darkModeSelected, target: $isDarkMode });

sample({ clock: $isDarkMode, target: changeDarkModeFx });
