import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/Components/ui/textarea'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError
} from "@/components/ui/field"

export default function Form({data, setData, submit, errors, isDirty, reset}) {

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    return (
        <form onSubmit={submit} className="w-full">
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">
                                Name
                            </FieldLabel>
                            <Input
                                name="name"
                                type="text"
                                value={data?.name}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                            <FieldError errors={errors?.name} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="color">
                                Color
                            </FieldLabel>
                            <Input
                                name="color"
                                type="text"
                                value={data?.color}
                                onChange={handleChange}
                                placeholder="Color"
                            />
                            <FieldError errors={errors?.color} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="price">
                                Price
                            </FieldLabel>
                            <Input
                                name="price"
                                type="text"
                                value={data?.price}
                                onChange={handleChange}
                                placeholder="Price"
                            />
                            <FieldError errors={errors?.price} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">
                                Description
                            </FieldLabel>
                            <Textarea
                                name="description"
                                value={data?.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />
                            <FieldError errors={errors?.description} />
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>

            <div className="flex justify-between gap-1 mt-6">
                <Button variants="outline" type="button" onClick={() => reset()}>
                    Reset
                </Button>
                <div className="flex gap-1">
                    <Button variants="outline" type="button" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={!isDirty}>
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    )
}

