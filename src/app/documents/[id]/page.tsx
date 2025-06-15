"use client";

import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DocumentPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: document, isLoading, refetch } = api.document.getById.useQuery({ id });
  const sendMessage = api.conversation.sendMessage.useMutation({
    onError: (error) => {
      alert(`An error occurred: ${error.message}`);
    },
  });

  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!document?.conversation) return;

    await sendMessage.mutateAsync({
      conversationId: document.conversation.id,
      text: message,
    });

    setMessage("");
    await refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!document) {
    return <div>Document not found.</div>;
  }

  return (
    <main className="container mx-auto grid grid-cols-2 gap-8 p-8">
      <div className="col-span-1">
        <div className="flex h-full flex-col rounded-lg bg-gray-100 p-4">
          <div className="flex-grow">
            {document.conversation?.messages.map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block rounded-lg px-4 py-2 ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-grow rounded-l-lg border p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="rounded-r-lg bg-blue-500 px-4 py-2 text-white" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <h1 className="mb-8 text-4xl font-bold">{document.title}</h1>
        <div className="prose lg:prose-xl">
          <pre>{document.content}</pre>
        </div>
      </div>
    </main>
  );
}