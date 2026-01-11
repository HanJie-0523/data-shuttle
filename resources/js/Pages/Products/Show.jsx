import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { router } from '@inertiajs/react'

const Show = ({ product }) => {

    return (
        <>
            <Head title="Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col mb-8 space-y-8">
                        <Button
                            className="ml-auto"
                            onClick={() => router.get(route('products.edit', product.data.id))}
                        >
                            Edit
                        </Button>
                        <div className="flex flex-col gap-6">
                            <span className="text-3xl">
                               Product #{product.data.id}
                            </span>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">
                                        Name
                                    </span>
                                    <span>
                                        {product.data.name}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">
                                        Name
                                    </span>
                                    <span>
                                        {product.data.name}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">
                                        Color
                                    </span>
                                    <span>
                                        {product.data.color}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">
                                        Price
                                    </span>
                                    <span>
                                        {product.data.price}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">
                                        Description
                                    </span>
                                    <span>
                                        {product.data.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


Show.layout = (page) =>
    <AuthenticatedLayout header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Products
        </h2>
    }>
        {page}
    </AuthenticatedLayout>

export default Show
