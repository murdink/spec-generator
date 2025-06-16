"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";

const mockSavedSpecs = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution for small businesses",
    lastModified: "Jan 15, 2024",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Secure mobile banking with biometric auth",
    lastModified: "Jan 12, 2024",
  },
  {
    id: "3",
    title: "Project Management Tool",
    description: "Team collaboration and project tracking",
    lastModified: "Jan 10, 2024",
  },
  {
    id: "4",
    title: "Healthcare Portal",
    description: "Patient management for healthcare providers",
    lastModified: "Jan 8, 2024",
  },
  {
    id: "5",
    title: "Learning Platform",
    description: "Online education with course management",
    lastModified: "Jan 5, 2024",
  },
  {
    id: "6",
    title: "Inventory System",
    description: "Warehouse management and tracking",
    lastModified: "Jan 3, 2024",
  },
];

export function SavedSpecs() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-medium text-gray-900 text-xl">
            Saved Specifications
          </h1>
          <p className="mt-1 text-gray-500 text-sm">
            {mockSavedSpecs.length} specifications
          </p>
        </div>
        <Button size="sm" className="rounded-full px-4">
          <Plus className="mr-1.5 h-4 w-4" />
          New Spec
        </Button>
      </div>

      {/* Specs Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockSavedSpecs.map((spec) => (
          <Card
            key={spec.id}
            className="cursor-pointer border-gray-200 p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-lg bg-blue-50 p-2">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 truncate font-medium text-gray-900 text-sm">
                  {spec.title}
                </h3>
                <p className="mb-2 line-clamp-2 text-gray-600 text-xs">
                  {spec.description}
                </p>
                <p className="text-gray-400 text-xs">{spec.lastModified}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
