"use client";

import { api } from "@/trpc/react";
import Link from "next/link";

export default function DocumentsPage() {
  const { data: documents, isLoading } = api.document.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-8 font-bold text-4xl">Saved Documents</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {documents?.map(
          (doc: { id: number; title: string; createdAt: string }) => (
            <Link href={`/documents/${doc.id}`} key={doc.id}>
              <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100">
                <h5 className="mb-2 font-bold text-2xl text-gray-900 tracking-tight">
                  {doc.title}
                </h5>
                <p className="font-normal text-gray-700">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </main>
  );
}
