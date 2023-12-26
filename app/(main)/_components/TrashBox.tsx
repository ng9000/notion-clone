"use client";
import { LoadingSpinner } from "@/components/Loader/LoadingSpinner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((doc) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Failed to restore note.",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Failed to restore note.",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
    if (documents === undefined) {
      return (
        <div className="h-full items-center justify-center flex p-4">
          <LoadingSpinner size="lg" />
        </div>
      );
    }
  };
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
          >
            <span className="pl-2 truncate">{doc.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                className="rounded-sm hover:bg-neutral-200 p-2 dark:hover:bg-neutral-600"
                onClick={(e) => onRestore(e, doc._id)}
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  className="rounded-sm hover:bg-neutral-200 p-2 dark:hover:bg-neutral-600"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
