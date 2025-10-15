import CourseDetailPage from './client-page'

export function generateStaticParams() {
    // Generate static params for sample course IDs
    // Add more IDs as needed
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ]
}

export const dynamicParams = true // Allow dynamic routes not in generateStaticParams

export default function Page() {
    return <CourseDetailPage />
}
