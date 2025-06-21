import { useState, useEffect } from "react";
import {
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { LoaderCircle } from "lucide-react";

function DataTable({
  columns,
  loading,
  data,
  pageSize,
  pageNumber,
  pageCount,
  searchValue,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  filterKey,
  filterLabel,
  addDialog,
}) {
  const [inputValue, setInputValue] = useState(searchValue);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue?.length >= 3 || inputValue === "") {
        onSearchChange(inputValue);
        onPageChange(1);
      }
    }, 100);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater({ pageIndex: pageNumber - 1, pageSize }) : updater;
      onPageChange(newPagination.pageIndex + 1);
      onPageSizeChange(newPagination.pageSize);
    },
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex: pageNumber - 1,
        pageSize,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        {filterKey && (
          <Input
            placeholder={`Buscar ${filterLabel}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="max-w-sm"
          />
        )}
        {filterLabel && (
          <Button className="ml-auto" onClick={addDialog}>
            Agregar {filterLabel}
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-5" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
