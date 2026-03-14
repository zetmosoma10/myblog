import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2, X } from "lucide-react";

/*
 * This component uses "react-dropzone" for image upload logic. The state is manage in the parent component(PostForm)
 */

type Props = {
  value?: string; // * current image URL (from form state)
  setUploadedImage: (file: File) => void; // * called to save image to state
  onChange: (url: string) => void; // * called after upload with Cloudinary URL
};

const ImageUpload = ({ value, onChange, setUploadedImage }: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // * We use "useCallback" to avoid running this function whenever the other inputs changes, we basically cached it. We only run it when onChange function run.
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      setError(null);

      // * Upload the image to cloudinary
      try {
        setUploadedImage(file);
        onChange(URL.createObjectURL(file));
      } catch (error: any) {
        setError(error.message ?? "Upload failed.");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange],
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 1024 * 1024 * 5, // * 5MB
    multiple: false,
  });

  // * Already has an image — show preview
  if (value) {
    return (
      <div className="relative w-full rounded-md overflow-hidden border border-border group">
        <img
          src={value}
          alt="Cover image preview"
          className="w-full max-h-70 object-cover"
        />
        {/* Remove button */}
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-3 right-3 cursor-pointer bg-background/80 backdrop-blur-sm border border-border rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:border-destructive hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // * No image — show dropzone
  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-md p-10 
          flex flex-col items-center justify-center gap-3 
          cursor-pointer transition-all
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }
        `}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <>
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="font-mono text-sm text-muted-foreground">
              // uploading...
            </p>
          </>
        ) : (
          <>
            <ImagePlus
              className={`w-8 h-8 transition-colors ${
                isDragActive ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <div className="text-center">
              <p className="font-mono text-sm text-muted-foreground">
                {isDragActive
                  ? "// drop it here"
                  : "// drag & drop or click to upload"}
              </p>
              <p className="font-mono text-xs text-muted-foreground/60 mt-1">
                PNG, JPG, WEBP — max 5MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="font-mono text-xs text-destructive">// {error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
