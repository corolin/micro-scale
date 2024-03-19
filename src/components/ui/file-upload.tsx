import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

type FileUploadProps = {
  onUpload?: (_file: File) => void;
  accept: string[];
  error?: string;
  className?: string;
  multiple?: boolean;
  text?: React.ReactElement | string;
};

const defaultText = (
  <span className="text-sm flex flex-col group">
    <UploadIcon className="mx-auto mb-3" />
    Drop your image here or{" "}
    <span className="text-zinc-500 underline underline-offset-2">
      browse your computer
    </span>
  </span>
);

export default function FileUpload({
  onUpload,
  accept,
  error,
  className,
  text = defaultText,
}: FileUploadProps) {
  const [isUploadError, setUploadError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) return;

    onUpload?.(fileList[0]);
  };

  const onFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setUploadError(false);
    let file: File | null = null;

    if (!e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        if (accept.indexOf(e.dataTransfer.files[i].type) > -1) {
          file = e.dataTransfer.files[i];
          break;
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          const potentialFile = e.dataTransfer.items[i].getAsFile();
          if (potentialFile && accept.indexOf(potentialFile.type) > -1) {
            file = potentialFile;
            break;
          }
        }
      }
    }

    if (!file) {
      setUploadError(true);
      return;
    }

    onUpload?.(file);
  };

  return (
    <div
      onClick={() => inputRef?.current?.click()}
      onDrop={onFileDrop}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        "flex flex-col select-none text-sm text-zinc-500 cursor-pointer p-4 rounded-lg items-center justify-center border border-dashed border-zinc-300 transition-colors hover:bg-zinc-50",
        className
      )}
    >
      <div className="flex flex-col items-center max-w-xs text-center">
        {text}
      </div>
      <div className="max-w-xs mt-2 text-center text-balance">
        <span className="text-xs text-zinc-400">JPEG, PNG format, max 1MB</span>
      </div>

      {isUploadError && (
        <small className="text-rose-600">
          {error || "Invalid file type. Please upload a valid file type."}
        </small>
      )}

      <input
        ref={inputRef}
        accept={accept.join(", ")}
        type="file"
        onChange={onFileUpload}
        className="hidden"
      />
    </div>
  );
}
