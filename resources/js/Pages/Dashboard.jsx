import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import FilesDataTable from '@/Components/FilesDataTable'
import DragDropFileUpload from '@/Components/DragDropFileUpload'
import { Button } from '@/Components/ui/button'
import { useForm } from '@inertiajs/react'

export default function Dashboard({ files }) {
    const { data, setData, post, reset } = useForm({
        file: null,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('dashboard.upload-file'), {
            onSuccess: () => {
                reset()
            }
        })
    }

    const handleFileSelect = (file) => {
        setData('file', file)
    }

    const handleRemoveFile = () => {
        setData('file', null)
    }

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
                    <div className="mb-8 space-y-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            File Upload History
                        </h3>

                        <form onSubmit={submit} className="space-y-4">
                            <DragDropFileUpload
                                onFileSelect={handleFileSelect}
                                onRemoveFile={handleRemoveFile}
                                selectedFile={data.file}
                                accept=".csv,.txt"
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
                        <FilesDataTable data={files} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
