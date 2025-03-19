"use client";

import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

export default function Loading() {
  return (
    <div className="grid gap-6">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton width={200} height={24} />
                    <Skeleton width={80} height={24} className="rounded-full" />
                  </div>
                  <Skeleton width={300} height={20} />
                </div>
                <Skeleton width={40} height={40} circle />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton width={120} height={20} />
                <div className="rounded-md border p-3">
                  <Skeleton width="100%" height={24} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Skeleton width={120} height={36} className="rounded-md" />
                <Skeleton width={100} height={36} className="rounded-md" />
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t pt-4">
              <Skeleton width={140} height={16} />
              <Skeleton width={120} height={36} className="rounded-md" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
