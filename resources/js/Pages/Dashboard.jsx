import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import FilesDataTable from '@/Components/FilesDataTable'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { useForm } from '@inertiajs/react'

export default function Dashboard({ files }) {
    const { setData, post } = useForm({
        file: null,
    });

    const submit = (e) => {
        e.preventDefault()
        post(route('dashboard.upload-file'))
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
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            File Upload History
                        </h3>

                        <div className="p-6 border my-6 flex items-center justify-between">
                            <span>
                                Select file/Drag and drop
                            </span>
                            <form onSubmit={submit} className="flex gap-2" >
                                <div>
                                    <Input type="file"  onChange={e => setData('file', e.target.files[0])}/>
                                </div>
                                <Button
                                    type="submit"
                                >
                                    Upload File
                                </Button>
                            </form>
                        </div>
                        <FilesDataTable data={files} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
