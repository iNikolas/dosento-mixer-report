export const supportedFormats = ["csv"];
export const minBatchDataLength = 18;
export const maxBatchDataLength = 19;

export const options: Omit<
  Papa.ParseLocalConfig<unknown, File>,
  "complete" | "error"
> = {
  delimiter: ",",
};
