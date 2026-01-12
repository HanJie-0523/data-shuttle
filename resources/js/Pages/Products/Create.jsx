import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import Form from './Components/Form'
import { toast } from 'sonner'

const Create = () => {

    const { data, setData, post, errors, setError, isDirty, reset } = useForm({
        name: '',
        color: '',
        price: '',
        description: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('products.store'), {
            onSuccess: () => {
                toast.success("Product has been created.")
            },
            onError: (errors) => {
                setError(errors)
            },
        })
    }

    return (
        <>
            <Head title="Create Product" />

            <div className="py-12 flex justify-center">
                <div className="w-[800px]">
                    <div className="flex border rounded-xl p-7">
                        <Form
                            data={data}
                            setData={setData}
                            submit={submit}
                            errors={errors}
                            isDirty={isDirty}
                            reset={reset}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

Create.layout = (page) =>
    <AuthenticatedLayout header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Create Product
        </h2>
    }>
        {page}
    </AuthenticatedLayout>

export default Create
