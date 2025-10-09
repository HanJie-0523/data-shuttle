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
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => {
                    const status = getValue()
                    const statusConfig = {
                        pending: { variant: 'secondary', label: 'Pending' },
                        processing: { variant: 'default', label: 'Processing' },
                        completed: { variant: 'default', label: 'Completed' },
                        failed: { variant: 'destructive', label: 'Failed' },
                    }

                    const config = statusConfig[status] || { variant: 'secondary', label: status }

                    return (
                        <Badge variant={config.variant}>
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
