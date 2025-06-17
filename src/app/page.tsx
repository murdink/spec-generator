"use client";

import { ChatInterface } from "@/components/chat-interface";
import { SavedSpecs } from "@/components/saved-specs";
import { SpecDocument } from "@/components/spec-document";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { FileText, List } from "lucide-react";
import { useEffect, useState } from "react";

function GeneratorView({ documentId }: { documentId: number }) {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <ChatInterface documentId={documentId} />
        </div>
        <div className="order-1 lg:order-2">
          <SpecDocument documentId={documentId} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentView, setCurrentView] = useState<"generator" | "saved">(
    "generator"
  );
  const [documentId, setDocumentId] = useState<number | null>(null);
  const createDocument = api.document.create.useMutation({
    onSuccess: (data: { id: number }) => {
      setDocumentId(data.id);
    },
  });

  useEffect(() => {
    if (!documentId && !createDocument.isPending) {
      createDocument.mutate({
        title: "New Document",
        content: "# Your Spec\n\nStart chatting to generate your document.",
      });
    }
  }, [documentId, createDocument]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="border-gray-200 border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-medium text-gray-900 text-lg">Spec Generator</h1>
          <div className="flex space-x-1">
            <Button
              variant={currentView === "generator" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("generator")}
              className="text-sm"
            >
              <FileText className="mr-1.5 h-4 w-4" />
              Generator
            </Button>
            <Button
              variant={currentView === "saved" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("saved")}
              className="text-sm"
            >
              <List className="mr-1.5 h-4 w-4" />
              Saved
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {currentView === "generator" ? (
        documentId ? (
          <GeneratorView documentId={documentId} />
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <SavedSpecs />
      )}
    </div>
  );
}
