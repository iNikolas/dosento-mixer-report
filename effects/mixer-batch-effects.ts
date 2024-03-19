import { createEffect } from "effector";
import { toast } from "react-toastify";

import { parseFile } from "@/utils";
import { readFromReportsStorage, updateReportsStorage } from "@/db";

export const parseFileFx = createEffect(parseFile);

export const readFromeRemoteStorageFx = createEffect(readFromReportsStorage);

export const updateRemoteStorageFx = createEffect(updateReportsStorage);

export const showSuccessfullDataUploadMessage = createEffect(
  (amount: number) => {
    const amountText = amount === 1 ? "1 запис" : `${amount} записів`;
    const message = `Дані успішно завантажено до віддаленого сховища: ${amountText}.`;
    toast.success(message);
  },
);

export const showSuccessfullDataDownloadMessage = createEffect(
  (amount: number) => {
    const amountText = amount === 1 ? "1 запис" : `${amount} записів`;
    const message = `Дані успішно завантажено з віддаленого сховища: ${amountText}.`;
    toast.success(message);
  },
);
