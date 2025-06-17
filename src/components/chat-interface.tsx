"use client";

import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ChatInterface({ documentId }: { documentId: number }) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = api.useUtils();

  const { data: document } = api.document.getById.useQuery({ id: documentId });

  const sendMessage = api.conversation.sendMessage.useMutation({
    onMutate: async (newMessage) => {
      await utils.document.getById.cancel({ id: documentId });
      const previousDocument = utils.document.getById.getData({
        id: documentId,
      });
      utils.document.getById.setData({ id: documentId }, (oldDocument) => {
        if (!oldDocument || !oldDocument.conversation) return oldDocument;
        return {
          ...oldDocument,
          conversation: {
            ...oldDocument.conversation,
            messages: [
              ...oldDocument.conversation.messages,
              {
                id: Math.random(),
                text: newMessage.text,
                sender: "user",
                conversationId: newMessage.conversationId,
                createdAt: new Date(),
              },
            ],
          },
        };
      });
      setInputValue("");
      return { previousDocument };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousDocument) {
        utils.document.getById.setData(
          { id: documentId },
          context.previousDocument
        );
      }
    },
    onSettled: () => {
      utils.document.getById.invalidate({ id: documentId });
    },
  });

  const messages = document?.conversation?.messages ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  });

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !document?.conversation) return;

    await sendMessage.mutateAsync({
      conversationId: document.conversation.id,
      text: inputValue,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Chat Header */}
      <div className="border-gray-100 border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-500">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900">AI Assistant</h3>
            <p className="text-gray-500 text-sm">
              Let's build your spec together
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3",
              message.sender === "user" && "flex-row-reverse"
            )}
          >
            <Avatar className="h-7 w-7 flex-shrink-0">
              <AvatarFallback
                className={cn(
                  message.sender === "llm" ? "bg-blue-500" : "bg-gray-500"
                )}
              >
                {message.sender === "llm" ? (
                  <Bot className="h-3.5 w-3.5" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "max-w-[80%] flex-1",
                message.sender === "user" && "text-right"
              )}
            >
              <div
                className={cn(
                  "inline-block rounded-2xl px-3 py-2 text-sm",
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-200 bg-gray-100 text-gray-900"
                )}
              >
                {message.text}
              </div>
              {/* Timestamp could be added if available on the message model */}
            </div>
          </div>
        ))}

        {sendMessage.isPending && (
          <div className="flex items-start gap-3">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-blue-500">
                <Bot className="h-3.5 w-3.5" />
              </AvatarFallback>
            </Avatar>
            <div className="rounded-2xl border border-gray-200 bg-gray-100 px-3 py-2">
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                <div
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-gray-100 border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 rounded-full border-gray-200 focus:border-blue-300 focus:ring-blue-100"
            disabled={sendMessage.isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || sendMessage.isPending}
            size="sm"
            className="rounded-full px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
