"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Cover } from "@/components/Cover";
import { ToolBar } from "@/components/Toolbar/ToolBar";

interface DocumentIdPageProps {
  documentId: Id<"documents">;
}

const DocumentIdPage = ({ documentId }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-6xl lg:max-w-6xl mx-auto">
        <ToolBar initialData={document} preview />
        <Editor
          onChange={onChange}
          editable={false}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
