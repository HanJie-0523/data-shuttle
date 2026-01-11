import { usePage } from '@inertiajs/react'

export default function useTableQuery() {
    const { url } = usePage()

    const queryString = url.split('?')[1] ?? ''
    const params = new URLSearchParams(queryString)

    const filters = {}

    params.forEach((value, key) => {
        if (value === '') return

        // support arrays: filter[color][]=red
        if (key.endsWith('[]')) {
            const cleanKey = key.replace('[]', '')
            filters[cleanKey] ??= []
            filters[cleanKey].push(value)
        } else {
            filters[key] = value
        }
    })

    return {
        sort: filters.sort ?? null,
        direction: filters.direction ?? 'asc',
        filters,
    }
}
