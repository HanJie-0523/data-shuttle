import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { router } from '@inertiajs/react'
import { useMemo } from 'react'
import DataTable from '@/Components/DataTable'
import useTableQuery from '@/Hooks/useTableQuery'

const Index = ({ products }) => {
    const { sort, direction, filters } = useTableQuery()

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                sortable: true
            },
            {
                accessorKey: 'unique_key',
                header: 'Unique Key',
            },
            {
                accessorKey: 'name',
                header: 'Name',
                sortable: true
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'color',
                header: 'Color',
                sortable: true
            },
            {
                accessorKey: 'price',
                header: 'Price',
                cell: ({ getValue }) => (
                    <div className="text-sm font-medium text-gray-900">
                        {getValue()}
                    </div>
                ),
                sortable: true
            },
            {
                accessorKey: 'created_at',
                header: 'Created At',
                cell: ({ getValue }) => {
                    const date = new Date(getValue())
                    return (
                        <div className="text-sm text-gray-900">
                            {date.toLocaleDateString()} {date.toLocaleTimeString()}
                        </div>
                    )
                },
                sortable: true
            },
        ],
        []
    )

    const updatePageQuery = (params) => {
        const query = { ...filters, ...params }

        Object.keys(query).forEach((key) => {
            if (query[key] === null || query[key] === undefined || query[key] === '') {
                delete query[key]
            }
        })

        router.get(route('products.index'), query, {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <>
            <Head title="Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col mb-8 space-y-8">
                        <Button
                            className="ml-auto"
                            onClick={() => router.get(route('products.create'))}
                        >
                            Create
                        </Button>
                        <DataTable
                            data={products.data}
                            columns={columns}
                            emptyMessage="No products found."
                            pagination={products.meta}
                            sorting={
                                sort ? [{ id: sort, desc: direction === 'desc' }] : []
                            }
                            onUpdate={updatePageQuery}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}


Index.layout = (page) =>
    <AuthenticatedLayout header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Products
        </h2>
    }>
        {page}
    </AuthenticatedLayout>

export default Index
