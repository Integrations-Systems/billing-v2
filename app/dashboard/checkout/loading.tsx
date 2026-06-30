import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="space-y-3">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-72 mx-auto" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Packages */}
        <div className="grid gap-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 rounded-xl border"
            >
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>

              <div className="space-y-2 text-right">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-12 ml-auto" />
              </div>
            </div>
          ))}

          {/* Custom amount button */}
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Custom input section */}
        <div className="space-y-4 pt-3 border-t">
          <Skeleton className="h-4 w-48" />

          <div className="flex gap-3 items-center">
            <Skeleton className="h-11 flex-1" />

            <div className="space-y-2 min-w-[90px]">
              <Skeleton className="h-3 w-10 ml-auto" />
              <Skeleton className="h-6 w-16 ml-auto" />
            </div>
          </div>

          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}