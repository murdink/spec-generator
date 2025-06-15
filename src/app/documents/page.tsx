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
      <h1 className="text-4xl font-bold mb-8">Saved Documents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {documents?.map((doc) => (
          <Link href={`/documents/${doc.id}`} key={doc.id}>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{doc.title}</h5>
              <p className="font-normal text-gray-700">{new Date(doc.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}