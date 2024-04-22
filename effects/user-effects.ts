import { createEffect } from "effector";

import { getUserData } from "@/utils";

export const getUserDataFx = createEffect(getUserData);
