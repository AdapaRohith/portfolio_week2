import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
                <p className="text-muted mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-accent hover:bg-accent-dim text-background font-medium rounded-lg transition-all"
                >
                    Return Home
                </Link>
            </div>
        </main>
    )
}
