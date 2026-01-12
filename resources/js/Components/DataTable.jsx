import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@headlessui/react";

const DataTable = ({
    data,
    columns,
    pagination,
    sorting = [],
    onUpdate,
    emptyMessage = "No data found.",
}) => {
    const table = useReactTable({
        data: data || [],
        columns,
        state: { sorting },
        manualSorting: true,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSort = (column) => {
        if (!column.columnDef.sortable) return;

        const current = column.getIsSorted();

        if (!current) {
            onUpdate({
                page: 1,
                sort: column.id,
                direction: "asc",
            });
            return;
        }

        if (current === "asc") {
            onUpdate({
                page: 1,
                sort: column.id,
                direction: "desc",
            });
            return;
        }

        onUpdate({
            page: 1,
            sort: null,
            direction: null,
        });
    };

    return (
        <div className="w-full">
            <div className="rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id}>
                                {group.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={
                                            header.column.columnDef.sortable
                                                ? "cursor-pointer select-none"
                                                : "cursor-default text-muted-foreground"
                                        }
                                        onClick={() =>
                                            header.column.columnDef.sortable &&
                                            handleSort(header.column)
                                        }
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {header.column.columnDef.sortable &&
                                            ({
                                                asc: " ▲",
                                                desc: " ▼",
                                            }[header.column.getIsSorted()] ??
                                                "")}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        Page {pagination.current_page} of {pagination.last_page}
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onUpdate({ page: pagination.current_page - 1 })
                            }
                            disabled={pagination.current_page <= 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onUpdate({ page: pagination.current_page + 1 })
                            }
                            disabled={
                                pagination.current_page >= pagination.last_page
                            }
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
