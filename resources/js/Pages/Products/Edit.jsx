import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useForm} from '@inertiajs/react'
import Form from './Components/Form'
import { toast } from 'sonner'

const Edit = ({ product }) => {

    const { data, setData, patch, errors, setError, isDirty, reset } = useForm({
        name: product.data.name ?? '',
        color: product.data.color ?? '',
        price: product.data.price ?? '',
        description: product.data.description ?? '',
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('products.update', product.data.id), {
            onSuccess: () => {
                toast.success("Product has been updated.")
            },
            onError: (errors) => {
                setError(errors)
            },
        })
    }

    return (
        <>
            <Head title="Edit Product" />

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

Edit.layout = (page) =>
    <AuthenticatedLayout header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Edit Product
        </h2>
    }>
        {page}
    </AuthenticatedLayout>

export default Edit
