import { useState } from "react";
import { EllipsisVertical, ReceiptText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SaleDetailSheet from "./sale-detail-sheet";

function ActionCell({ row }) {
  const [viewDetail, setViewDetail] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <EllipsisVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setViewDetail(true);
            }}
          >
            <ReceiptText className="h-4 w-4" />
            Ver detalle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SaleDetailSheet open={viewDetail} onOpenChange={setViewDetail} sale={row.original} />
    </>
  );
}

export default ActionCell;
