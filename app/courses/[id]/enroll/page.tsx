import EnrollPage from './client-page'

export function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ]
}

export const dynamicParams = true

export default function Page() {
    return <EnrollPage />
}
