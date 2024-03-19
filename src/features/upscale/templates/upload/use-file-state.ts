import { useState } from "react";

export default function useFileState() {
  const [file, setFile] = useState<File | null>(null);

  return {
    file,
    previewUrl: file ? URL.createObjectURL(file) : null,
    setFile,
  };
}
