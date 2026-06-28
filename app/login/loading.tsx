import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg border shadow-md">
      {/* Título */}
      <Skeleton className="h-8 w-48" />

      {/* Descripción */}
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-6 mt-6">
        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Botón */}
        <Skeleton className="h-10 w-full" />

        {/* Registro */}
        <div className="flex justify-center">
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    </div>
  );
}