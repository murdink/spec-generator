"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import ReactMarkdown from "react-markdown";

const mockSpecDocument = `# E-Commerce Platform

## Overview
Modern e-commerce solution for small businesses to sell products online with intuitive interface and robust backend.

## Users
- **Store Owners**: Manage products and view sales
- **Customers**: Browse and purchase products  
- **Admins**: Platform oversight and reporting

## Features
- Product catalog with search
- Shopping cart and checkout
- User accounts and authentication
- Order tracking
- Payment processing (Stripe)
- Inventory management
- Basic analytics

## Technical Requirements
- **Frontend**: React with Next.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Hosting**: Cloud-based with CDN
- **Performance**: < 3s load time, 99.9% uptime

## Security
- HTTPS encryption
- Secure password storage
- PCI DSS compliance
- GDPR compliance

## Timeline
- Planning: 2 weeks
- Development: 8 weeks  
- Testing: 2 weeks
- Launch: 1 week`;

export function SpecDocument() {
  return (
    <div className="h-[calc(100vh-120px)] rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-gray-100 border-b p-4">
        <div>
          <h2 className="font-medium text-gray-900">Project Specification</h2>
          <p className="text-gray-500 text-sm">E-Commerce Platform</p>
        </div>
        <Button size="sm" className="rounded-full px-4">
          <Save className="mr-1.5 h-4 w-4" />
          Save
        </Button>
      </div>

      {/* Document Content */}
      <div className="h-[calc(100%-73px)] flex-1 overflow-y-auto p-6">
        <div className="prose prose-sm prose-gray max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="mt-0 mb-4 font-bold text-gray-900 text-xl">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-6 mb-3 font-semibold text-base text-gray-800">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-4 mb-2 font-medium text-gray-800 text-sm">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-3 text-gray-700 text-sm leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 list-inside list-disc space-y-1 text-gray-700">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 text-sm">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-medium text-gray-900">
                  {children}
                </strong>
              ),
            }}
          >
            {mockSpecDocument}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
