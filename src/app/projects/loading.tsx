"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { ModeToggle } from "~/components/mode-toggle";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Loading() {
  // Create an array of 3 items to simulate multiple project cards
  const skeletonProjects = Array(3).fill(0);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>

      <div className="grid gap-6">
        {skeletonProjects.map((_, index) => (
          <Card key={index} className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-full space-y-1">
                  <div className="flex items-center gap-2">
                    <Skeleton width={180} height={24} />
                    <Skeleton width={60} height={20} />
                  </div>
                  <Skeleton width={250} height={16} />
                </div>
                <Skeleton width={32} height={32} circle />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="current-key" className="w-full">
                <TabsList>
                  <TabsTrigger value="current-key">
                    <Skeleton width={100} />
                  </TabsTrigger>
                  <TabsTrigger value="key-history">
                    <Skeleton width={80} />
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="current-key" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Skeleton width={60} height={16} className="mb-2" />
                      <div className="rounded-md bg-muted p-3">
                        <Skeleton height={20} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Skeleton width={150} height={32} />
                      <Skeleton width={120} height={32} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-4">
              <Skeleton width={120} height={14} />
              <Skeleton width={100} height={32} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
