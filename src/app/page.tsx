"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [documentContent, setDocumentContent] = useState("# Your Spec\n\nStart chatting to generate your document.");
  const [message, setMessage] = useState("");

  const createDocument = api.document.create.useMutation({
    onSuccess: (data) => {
      setDocumentId(data.id);
    },
  });

  const updateDocument = api.document.update.useMutation();
  const sendMessage = api.conversation.sendMessage.useMutation({
    onError: (error) => {
      alert(`An error occurred: ${error.message}`);
    },
  });

  const { data: document, refetch } = api.document.getById.useQuery(
    { id: documentId! },
    { enabled: !!documentId },
  );

  useEffect(() => {
    if (!documentId && !createDocument.isPending) {
      createDocument.mutate({
        title: "New Document",
        content: "# Your Spec\n\nStart chatting to generate your document.",
      });
    }
  }, [documentId, createDocument]);

  const handleSendMessage = async () => {
    if (!documentId || !document?.conversation) return;

    await sendMessage.mutateAsync({
      conversationId: document.conversation.id,
      text: message,
    });

    // In a real application, you would get the updated content from the LLM
    // and update the document state. For now, we'll just append the message.
    const newContent = `${documentContent}\n\n**User:** ${message}`;
    setDocumentContent(newContent);
    setMessage("");
    refetch();
  };

  const handleSave = () => {
    if (!documentId) return;
    updateDocument.mutate({
      id: documentId,
      content: documentContent,
    });
  };

  return (
    <main className="grid grid-cols-2 h-screen gap-8 p-8">
      <div className="col-span-1 flex flex-col bg-gray-100 rounded-lg p-4">
        <div className="flex-grow overflow-y-auto mb-4">
          {document?.conversation?.messages.map((msg) => (
            <div key={msg.id} className={`mb-2 ${msg.sender === "user" ? "text-right" : ""}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border rounded-l-md p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 rounded-r-md"
            onClick={handleSendMessage}
            disabled={sendMessage.isPending}
          >
            {sendMessage.isPending ? "..." : "Send"}
          </button>
        </div>
      </div>
      <div className="col-span-1 flex flex-col bg-gray-100 rounded-lg p-4">
        <div className="flex-grow overflow-y-auto mb-4">
          <pre className="whitespace-pre-wrap">{documentContent}</pre>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md self-end"
          onClick={handleSave}
          disabled={updateDocument.isPending}
        >
          {updateDocument.isPending ? "Saving..." : "Approve and Save"}
        </button>
      </div>
    </main>
  );
}
