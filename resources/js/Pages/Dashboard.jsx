import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import DragDropFileUpload from '@/Components/DragDropFileUpload'
import { Button } from '@/Components/ui/button'
import { useForm, usePoll } from '@inertiajs/react'
import DataTable from '@/Components/DataTable'
import { useMemo } from 'react'
import { Badge } from '@/Components/ui/badge'

const Dashboard = ({ documents }) => {
    const { data, setData, post, reset, errors } = useForm({
        file: null,
    })

    const { start } = usePoll(2000, {
        only: ['documents'],
    }, {
        autoStart: false}
    )

    const submit = (e) => {
        e.preventDefault()
        post(route('dashboard.upload-file'), {
            onSuccess: () => {
                reset()
                start()
            },
            onError: (errors) => {
                console.log('Upload errors:', errors)
            }
        })
    }

    const handleFileSelect = (file) => {
        setData('file', file)
    }

    const handleRemoveFile = () => {
        setData('file', null)
    }

    const columns = useMemo(
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
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 space-y-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            File Upload History
                        </h3>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Display errors */}
                            {errors.file && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-red-700 font-medium">Upload Error</p>
                                    </div>
                                    <p className="text-sm text-red-600 mt-1">{errors.file}</p>
                                </div>
                            )}

                            <DragDropFileUpload
                                onFileSelect={handleFileSelect}
                                onRemoveFile={handleRemoveFile}
                                selectedFile={data.file}
                                accept=".csv,.txt"
                                hasError={!!errors.file}
                            />

                            {data.file && (
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700 min-w-[120px]"
                                    >
                                        Upload File
                                    </Button>
                                </div>
                            )}
                        </form>
                        <DataTable
                            data={documents.data}
                            columns={columns}
                            emptyMessage="No files found."
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

Dashboard.layout = (page) =>
    <AuthenticatedLayout header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Dashboard
        </h2>
    }>
        {page}
    </AuthenticatedLayout>

export default Dashboard
