"use client";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const TransformationImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      }),
      title
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-white drop-shadow-lg">
          Transformed
        </h3>

        {hasDownload && (
          <button
            onClick={downloadHandler}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 transition backdrop-blur-md border border-white/20"
          >
            <Image
              src="/assets/icons/download.svg"
              alt="Download"
              width={20}
              height={20}
              className="pb-[2px]"
            />
            <span className="text-sm font-medium">Download</span>
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg p-2">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes="(max-width: 767px) 100vw, 50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="rounded-xl object-contain max-w-full max-h-[80vh]"
            onLoad={() => setIsTransforming && setIsTransforming(false)}
            onError={() =>
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)()
            }
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-xl gap-3">
              <Image
                src="/assets/icons/spinner.svg"
                width={48}
                height={48}
                alt="Loading..."
              />
              <p className="text-white/80 text-sm font-medium">
                Please wait...
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white text-lg font-medium backdrop-blur-md">
          Transformed Image
        </div>
      )}
    </div>
  );
};

export default TransformationImage;
