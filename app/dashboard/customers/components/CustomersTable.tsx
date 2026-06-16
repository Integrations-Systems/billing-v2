// components/UsersTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

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
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Fiscal</TableHead>
            <TableHead>RFC</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Régimen Fiscal</TableHead>
            <TableHead>Estatus</TableHead>
            <TableHead className="w-30 text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No hay usuarios registrados.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.legal_name}
                </TableCell>

                <TableCell className="font-medium">
                    {user.tax_id}
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.phone}</TableCell>

                <TableCell>{user.tax_system}</TableCell>

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

                <TableCell className="text-right">
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}