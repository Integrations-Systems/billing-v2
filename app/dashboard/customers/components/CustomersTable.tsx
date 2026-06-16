// components/CustomersTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import { Customer } from "@/app/models/Customer";

interface UsersTableProps {
  users: Customer[];
  onEdit?: (user: Customer) => void;
  onDelete?: (user: Customer) => void;
}

export default function CustomersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card text-muted-foreground">
        No hay usuarios registrados.
      </div>
    );
  }

  return (
    <>
      {/* ========================= */}
      {/* MOBILE */}
      {/* ========================= */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="space-y-4 p-4">
              <div>
                <h3 className="font-semibold">
                  {user.legal_name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  RFC: {user.tax_id}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>

                <div>
                  <span className="text-muted-foreground">
                    Régimen:
                  </span>{" "}
                  {user.tax_system}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    user.is_active
                      ? "default"
                      : "secondary"
                  }
                >
                  {user.is_active
                    ? "Activo"
                    : "Inactivo"}
                </Badge>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit?.(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete?.(user)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ========================= */}
      {/* DESKTOP */}
      {/* ========================= */}
      <div className="hidden rounded-lg border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Fiscal</TableHead>
              <TableHead>RFC</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Régimen Fiscal</TableHead>
              <TableHead>Estatus</TableHead>
              <TableHead className="w-[120px] text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.legal_name}
                </TableCell>

                <TableCell>
                  {user.tax_id}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  {user.phone}
                </TableCell>

                <TableCell>
                  {user.tax_system}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      user.is_active
                        ? "default"
                        : "secondary"
                    }
                  >
                    {user.is_active
                      ? "Activo"
                      : "Inactivo"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit?.(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete?.(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}