import React from 'react'
import { Badge } from '@/Components/ui/badge'
import DataTable from '@/Components/DataTable'

const FilesDataTable = ({ data }) => {
    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'created_at',
                header: 'Upload Time',
                cell: ({ getValue }) => {
                    const date = new Date(getValue())
                    return (
                        <div className="text-sm text-gray-900">
                            {date.toLocaleDateString()} {date.toLocaleTimeString()}
                        </div>
                    )
                },
            },
            {
                accessorKey: 'name',
                header: 'File Name',
                cell: ({ getValue }) => (
                    <div className="text-sm font-medium text-gray-900">
                        {getValue()}
                    </div>
                ),
            },
            {
                accessorKey: 'imported_count',
                header: 'Imported Count',
                cell: ({ getValue }) => (
                    <div className="text-sm font-medium text-gray-900">
                        {getValue()}
                    </div>
                ),
            },
            {
                accessorKey: 'error_count',
                header: 'Error Count',
                cell: ({ getValue }) => (
                    <div className="text-sm font-medium text-gray-900">
                        {getValue()}
                    </div>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => {
                    const status = getValue()
                    const statusConfig = {
                        pending: { variant: 'secondary', label: 'Pending', className: 'bg-yellow-400 text-black hover:bg-yellow-500' },
                        processing: { variant: 'default', label: 'Processing', className: 'bg-blue-500 text-white hover:bg-blue-600' },
                        completed: { variant: 'default', label: 'Completed', className: 'bg-green-500 text-white hover:bg-green-600' },
                        failed: { variant: 'destructive', label: 'Failed', className: 'bg-red-500 text-white hover:bg-red-600' },
                    }

                    const config = statusConfig[status] || { variant: 'secondary', label: status, className: 'bg-gray-500 text-white hover:bg-gray-600' }

                    return (
                        <Badge variant={config.variant} className={config.className}>
                            {config.label}
                        </Badge>
                    )
                },
            },

        ],
        []
    )

    return (
        <DataTable
            data={data}
            columns={columns}
            emptyMessage="No files found."
        />
    )
}

export default FilesDataTable
