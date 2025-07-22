export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="text-blue-600 hover:underline">Go to Home</a>
    </div>
  );
}
