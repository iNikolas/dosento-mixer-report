import { createEffect } from "effector";
import { toast } from "react-toastify";

export const showErrorMessageFx = createEffect((e: Error) => {
  toast.error(e.message);
});
