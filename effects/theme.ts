import { createEffect } from "effector";

import { themes } from "@/config";

export const changeDarkModeFx = createEffect((isDarkTheme: boolean) => {
  document.documentElement.dataset.theme = isDarkTheme
    ? themes.dark
    : themes.light;
});
