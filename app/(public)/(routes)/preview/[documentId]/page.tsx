import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DocumentIdPage from "@/app/(public)/_components/document-page";
import { convex } from "@/lib/convex";

interface DocumentIdMetadataProps {
  params: {
    documentId: Id<"documents">;
  };
}
export async function generateMetadata({ params }: DocumentIdMetadataProps) {
  // Fetch document data
  const document = await convex.query(api.documents.getMetadataById, {
    documentId: params.documentId,
  });

  console.log(document, "========================================");

  // If document is undefined, provide default values
  if (!document) {
    return {
      title: "Document Not Found",
      openGraph: {
        title: "Document Not Found",
        description: "The document you are looking for does not exist.",
        images: [],
      },
    };
  }

  // return {
  //   title: document.title,
  //   // description: document.content ? document.content.substring(0, 160) : "", // First 160 characters as description
  //   openGraph: {
  //     title: document.title,
  //     //description: document.content ? document.content.substring(0, 160) : "",
  //     url: `https://notion-clone-eight-sable.vercel.app/preview/${params.documentId}`,
  //     images: document.coverImage
  //       ? [
  //           {
  //             url: document.coverImage,
  //             width: 800,
  //             height: 600,
  //             alt: document.title,
  //           },
  //         ]
  //       : [],
  //   },
  // };

  return {
    title: document.title,
    description: document.content ? document.content.substring(0, 160) : "",
    openGraph: {
      title: document.title,
      description: document.content ? document.content.substring(0, 160) : "",
      url: `https://yourwebsite.com/documents/${params.documentId}`,
      images: document.coverImage
        ? [
            {
              url: document.coverImage,
              width: 256,
              height: 256,
              alt: document.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: document.title,
      description: document.content ? document.content.substring(0, 160) : "",
      image: {
        url: document.coverImage || "",
        alt: document.title,
        width: 800,
        height: 600,
      },
    },
  };
}

const DocumentIdMetadata = ({ params }: DocumentIdMetadataProps) => {
  return <DocumentIdPage documentId={params.documentId} />;
};

export default DocumentIdMetadata;
