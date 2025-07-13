"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/../constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";
import { Search } from "./search";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      searchParams,
      key: "page",
      value: String(pageValue),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Recent Edits
        </h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card image={image} key={String(image._id)} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-white/80 text-xl mt-10">
          Empty List
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full items-center justify-center gap-6">
            <Button
              disabled={Number(page) <= 1}
              onClick={() => onPageChange("prev")}
              className="bg-white/10 text-white hover:bg-white/20 transition rounded-full px-6 py-2 backdrop-blur-md border border-white/20"
            >
              <PaginationPrevious />
            </Button>

            <p className="text-white text-lg font-medium">
              {page} / {totalPages}
            </p>

            <Button
              disabled={Number(page) >= totalPages}
              onClick={() => onPageChange("next")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg transition hover:brightness-110"
            >
              <PaginationNext />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li className="rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md p-3 hover:scale-[1.02] transition">
      <Link href={`/transformations/${image._id}`}>
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="rounded-lg h-52 w-full object-cover mb-4"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />

        <div className="flex justify-between items-center text-white">
          <p className="text-lg font-semibold truncate">{image.title}</p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as keyof typeof transformationTypes
              ].icon
            }`}
            alt={image.transformationType}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
};
