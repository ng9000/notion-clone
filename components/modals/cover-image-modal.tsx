"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
// import UploadThingFileUploader from "../upload-thing-button";

export const CoverImageModal = () => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div className="">
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
          {/* <UploadThingFileUploader /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
