import { z } from "zod";

const validateType = (val: File) => {
  const validTypes = ["image/png", "image/jpeg"];
  return val?.type && validTypes.includes(val.type);
};

export const validateImageSize = (size: number) => (val: File) => {
  const MAX_SIZE = size;
  return val?.size < MAX_SIZE;
};

const validateInstanceOf = (val: unknown) => {
  return val instanceof File;
};

export const ImageSchema = z
  .any()
  .refine(validateInstanceOf, {
    message: "Image is not valid",
  })
  .refine(validateType, {
    message:
      "File type not supported. Please upload a file with the following extensions: .png, .jpg",
  });
