"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

function DocumentEditor({ documentId }: { documentId: number }) {
  const [documentContent, setDocumentContent] = useState("");
  const [message, setMessage] = useState("");
  const utils = api.useUtils();

  const { data: document } = api.document.getById.useQuery({ id: documentId });

  const updateDocument = api.document.update.useMutation({
    onSuccess: () => {
      utils.document.getById.invalidate({ id: documentId });
    },
  });

  const sendMessage = api.conversation.sendMessage.useMutation({
    onSuccess: () => {
      utils.document.getById.invalidate({ id: documentId });
      setMessage("");
    },
    onError: (error) => {
      alert(`An error occurred: ${error.message}`);
    },
  });

  useEffect(() => {
    if (document) {
      setDocumentContent(document.content);
    }
  }, [document]);

  const handleSendMessage = async () => {
    if (!document?.conversation) return;
    await sendMessage.mutateAsync({
      conversationId: document.conversation.id,
      text: message,
    });
  };

  const handleSave = () => {
    updateDocument.mutate({
      id: documentId,
      content: documentContent,
    });
  };

  return (
    <main className="grid h-screen grid-cols-2 gap-8 p-8">
      <div className="col-span-1 flex flex-col rounded-lg bg-gray-100 p-4">
        <div className="mb-4 flex-grow overflow-y-auto">
          {document?.conversation?.messages.map(
            (msg: { id: number; sender: string; text: string }) => (
              <div
                key={msg.id}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                <span
                  className={`inline-block rounded-lg p-2 ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            )
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow rounded-l-md border p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="rounded-r-md bg-blue-500 px-4 text-white"
            onClick={handleSendMessage}
            disabled={sendMessage.isPending}
          >
            {sendMessage.isPending ? "..." : "Send"}
          </button>
        </div>
      </div>
      <div className="col-span-1 flex flex-col rounded-lg bg-gray-100 p-4">
        <div className="mb-4 flex-grow overflow-y-auto">
          <pre className="whitespace-pre-wrap">{documentContent}</pre>
        </div>
        <button
          type="button"
          className="self-end rounded-md bg-green-500 px-4 py-2 text-white"
          onClick={handleSave}
          disabled={updateDocument.isPending}
        >
          {updateDocument.isPending ? "Saving..." : "Approve and Save"}
        </button>
      </div>
    </main>
  );
}

export default function Home() {
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

  if (!documentId) {
    return <div>Loading...</div>;
  }

  return <DocumentEditor documentId={documentId} />;
}
