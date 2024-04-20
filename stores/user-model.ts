import { createStore, createEvent, sample } from "effector";
import { User } from "firebase/auth";

export const authStateChanged = createEvent<User | null>();

export const $currentUser = createStore<User | null>(null);

sample({ clock: authStateChanged, target: $currentUser });
