import { createEffect } from "effector";
import { toast } from "react-toastify";

export const showErrorMessageFx = createEffect((e: Error) => {
  toast.error(e.message);
});

export const redirectFx = createEffect((pathname: string) => {
  window.location.pathname = pathname;
});
