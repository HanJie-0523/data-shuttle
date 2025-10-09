import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import FilesDataTable from '@/Components/FilesDataTable'

export default function Dashboard({ files }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            File Upload History
                        </h3>
                        <FilesDataTable data={files} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
