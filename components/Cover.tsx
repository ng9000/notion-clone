"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}
export const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const removeImage = useMutation(api.documents.removeCoverImage);

  const handleRemoveImage = async () => {
    if (url) {
      edgestore.publicFiles.delete({
        url: url as string,
      });
    }
    removeImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[20vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image fill src={url} alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute opacity-0 group-hover:opacity-100 bottom-5 right-5 flex items-center gap-x-2">
          <Button
            className=" text-muted-foreground text-xs"
            variant="outline"
            onClick={() => coverImage.onReplace(url)}
            aria-label="change cover image"
          >
            <ImageIcon
              className="h-4 w-4 mr-2"
              aria-label="change cover image"
            />
            Change cover
          </Button>
          <Button
            className=" text-muted-foreground text-xs"
            variant="outline"
            onClick={handleRemoveImage}
            aria-label="remove cover image"
          >
            <X className="h-4 w-4 mr-2" aria-label="remove cover image" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
