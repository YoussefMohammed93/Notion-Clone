"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { api } from "@/convex/_generated/api";
import { Toolbar } from "@/components/toolbar";
import { CoverImage } from "@/components/cover";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const PreviewPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor"), {
        ssr: false,
        loading: () => (
          <div>
            <div className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
              <div className="space-y-4 pl-16">
                <Skeleton className="h-14 w-[50%]" />
                <Skeleton className="h-12 w-[80%]" />
                <Skeleton className="h-10 w-[100%]" />
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-24 w-[90%]" />
                <Skeleton className="h-16 w-[100%]" />
              </div>
            </div>
          </div>
        ),
      }),
    []
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const handleChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document == null) {
    return (
      <div className="pt-[10vh]">
        <CoverImage.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <div className="space-y-4 pl-16 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-12 w-[80%]" />
            <Skeleton className="h-10 w-[100%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-24 w-[90%]" />
            <Skeleton className="h-16 w-[100%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#1f1f1f]">
      <CoverImage preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={handleChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
