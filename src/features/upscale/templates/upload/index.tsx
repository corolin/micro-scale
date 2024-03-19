"use client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import useLockBodyScroll from "@/lib/hooks/use-lock-body-scroll";
import { SparklesIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { PredictionStatus } from "../../../../../types/predictions";
import LoadingOverlay from "../../components/loading-overlay";
import useFileState from "./use-file-state";
import usePollPrediction from "./use-poll-prediction";
import useUpload from "./use-upload";

export default function UploadTemplate() {
  const { file, setFile, previewUrl } = useFileState();
  const { uploadImage, status: uploadStatus } = useUpload();

  const { prediction } = usePollPrediction();

  useEffect(
    function watchForPredictionErrors() {
      if (!prediction) return;
      if (prediction.status === PredictionStatus.FAILED) {
        toast.error("An error has occured. Please try again.");
        return;
      }

      if (prediction.status === PredictionStatus.NSFW) {
        toast.error(
          "The image you uploaded is not suitable for upscaling. Please try again with a different image."
        );
        return;
      }
    },
    [prediction, prediction?.status]
  );

  const router = useRouter();
  useEffect(
    function watchForPredictionOutput() {
      if (!prediction || !prediction.output_url) return;
      router.push("/upscale/p/" + prediction.id);
    },
    [prediction, prediction?.id, prediction?.output_url, router]
  );

  useLockBodyScroll(
    uploadStatus === "processing" ||
      prediction?.status === PredictionStatus.PROCESSING
  );

  return (
    <>
      {uploadStatus === "processing" &&
        createPortal(
          <LoadingOverlay>
            <p>Uploading image...</p>
          </LoadingOverlay>,
          document.body
        )}
      {prediction?.status === PredictionStatus.PROCESSING &&
        createPortal(
          <LoadingOverlay>
            <p>Now upscaling your image...</p>
            <p>Please do not refresh this page.</p>
          </LoadingOverlay>,
          document.body
        )}
      <div className="min-h-dvh flex items-center justify-center">
        {previewUrl && (
          <div className="w-1/2 aspect-square grid content-start">
            <div className="w-full h-full border flex items-center justify-center p-4 aspect-square rounded-lg group relative">
              <div className="group-hover:opacity-100 opacity-0 absolute top-4 left-1/2 -translate-x-1/2 transition-opacity">
                <Button
                  size="sm"
                  onClick={() =>
                    prediction?.status !== PredictionStatus.PROCESSING &&
                    setFile(null)
                  }
                  className="z-10"
                >
                  <UploadIcon className="size-4 mr-2" />
                  Change image
                </Button>
              </div>
              <Image
                src={previewUrl}
                width={400}
                height={400}
                alt="test"
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-center my-4 gap-x-2">
              <Button
                onClick={() => uploadImage(file)}
                disabled={prediction?.status === PredictionStatus.PROCESSING}
              >
                Upscale it! <SparklesIcon className="size-4 ml-2" />
              </Button>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-500 text-sm mt-4 grid content-start">
              <h3 className="text-sm font-semibold">Note</h3>
              <span>
                By using µScale, you agree to our{" "}
                <Button variant="link" className="p-0 m-0 h-max" asChild>
                  <Link href="/terms" target="_blank">
                    terms of use
                  </Link>
                </Button>
                . Generating an image may take a few minutes in some cases
                depending on traffic and will cost{" "}
                <span className="text-black">1</span> credit.
              </span>
              div
            </div>
          </div>
        )}
        {!previewUrl && (
          <div className="w-1/2 aspect-square grid content-start">
            <FileUpload
              accept={["image/jpeg", "image/png"]}
              className="h-full w-full aspect-square"
              onUpload={setFile}
            />

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-500 text-sm mt-4 grid content-start">
              <h3 className="text-sm font-semibold">Note</h3>
              <span>
                By using µScale, you agree to our{" "}
                <Button variant="link" className="p-0 m-0 h-max" asChild>
                  <Link href="/terms" target="_blank">
                    terms of use
                  </Link>
                </Button>
                . Generating an image may take a few minutes in some cases
                depending on traffic and will cost{" "}
                <span className="text-black">1</span> credit.
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
