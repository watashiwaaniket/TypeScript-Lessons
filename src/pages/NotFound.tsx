import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-white">Page not found</h2>
      <p className="text-[#A5E9DD]/80">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="text-[#6FBEB2] hover:text-white underline w-fit">
        ← Back to home
      </Link>
    </div>
  );
}
