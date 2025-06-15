"use client";

import { useState } from "react";

export default function Home() {
  const [documentContent, setDocumentContent] = useState("# Your Spec\n\nStart chatting to generate your document.");
  
  return (
    <main className="grid grid-cols-2 h-screen gap-8 p-8">
      <div className="col-span-1 flex flex-col bg-gray-100 rounded-lg p-4">
        <div className="flex-grow overflow-y-auto mb-4">
          {/* Chat messages will go here */}
          <p className="text-gray-500">Chat history will appear here.</p>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border rounded-l-md p-2"
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-md">Send</button>
        </div>
      </div>
      <div className="col-span-1 flex flex-col bg-gray-100 rounded-lg p-4">
        <div className="flex-grow overflow-y-auto mb-4">
          <pre className="whitespace-pre-wrap">{documentContent}</pre>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md self-end">
          Approve and Save
        </button>
      </div>
    </main>
  );
}
