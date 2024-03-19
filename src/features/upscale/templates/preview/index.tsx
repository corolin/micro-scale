"use client";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import { Button } from "@/components/ui/button";
import { DownloadIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Database } from "../../../../../types/supabase";

type Props = {
  prediction: Database["public"]["Tables"]["predictions"]["Row"];
};
export default function PreviewTemplate({ prediction }: Props) {
  const downloadPredictionOutput = async () => {
    const response = await fetch(prediction.output_url!);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "upscaled-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-dvh flex flex-col pt-20 gap-6 mx-auto">
      <div className="justify-center items-center flex flex-col">
        <h1 className="font-heading leading-none text-3xl text-zinc-800 text-center">
          Your image has been upscaled!
        </h1>
        <p className="text-zinc-500 text-center mt-4 max-w-[30rem] text-balance">
          Compare the original image with the improved version that has been
          upscaled up to x2!
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full h-full">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={prediction.input_url!}
              alt="Original image"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={prediction.output_url!}
              alt="Improved image"
            />
          }
          className="flex max-w-96 mx-auto rounded-lg"
          aria-roledescription="Image comparison slider"
        />
        <div className="flex justify-center gap-5 mt-4">
          <Button variant="outline" onClick={downloadPredictionOutput}>
            <DownloadIcon className="mr-2 size-4" />
            Download
          </Button>
          <Button asChild>
            <Link href="/upscale">
              <SparklesIcon className="mr-2 size-4" />
              Upscale again
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
