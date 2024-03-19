import { useState } from "react";
import { toast } from "sonner";
import { useUpscaleContext } from "../../context";

type UploadingImageStatus = "idle" | "processing" | "success" | "error";

export default function useUpload() {
  const [status, setStatus] = useState<UploadingImageStatus>();
  const { setCurrentPredictionId } = useUpscaleContext();

  const uploadImage = async (file: File | null) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      setStatus("processing");
      // 1. Upload the image to supabase
      const data = new FormData();
      data.set("image", file, file.name);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // 2. Trigger the replicate function with the image url
      // 3. Get the prediction id to poll the status
      // 4. Poll the status until it's done
      // 5. Get the prediction url res
      const response = (await res.json()) as {
        id: string;
      };
      setStatus("success");
      setCurrentPredictionId(response.id);
    } catch (error: unknown) {
      setStatus("error");
      toast.error("Failed to upscale the image");
    }
  };

  return {
    uploadImage,
    status,
  };
}
