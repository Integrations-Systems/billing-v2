import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg border shadow-md">
      {/* Título */}
      <Skeleton className="h-8 w-44" />

      {/* Descripción */}
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-4 mt-6">
        {/* Nombre */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Apellido */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Teléfono */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Contraseña */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />

          <div className="relative">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full" />
          </div>
        </div>

        {/* Botón */}
        <Skeleton className="h-10 w-full" />

        {/* Link login */}
        <div className="flex justify-center">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}