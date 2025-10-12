import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import FilesDataTable from '@/Components/FilesDataTable'
import DragDropFileUpload from '@/Components/DragDropFileUpload'
import { Button } from '@/Components/ui/button'
import { useForm, usePoll } from '@inertiajs/react'

export default function Dashboard({ files }) {
    const { data, setData, post, reset, errors } = useForm({
        file: null,
    })

    const { start } = usePoll(2000, {
        only: ['files'],
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
                        <FilesDataTable data={files} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
