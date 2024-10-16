import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-2 sm:py-4 bottom-0 left-0 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mx-auto px-4 text-center sm:text-left text-xs sm:text-sm text-gray-600">
        <p>easy-ghfetch is free.</p>
        <div className="flex gap-x-4 sm:gap-x-6">
          <p>
            <Link
              href="https://www.npmjs.com/package/easy-ghfetch"
              className="hover:underline hover:underline-offset-4"
            >
              Npm Package
            </Link>
          </p>
          <p>
            <Link
              href="https://x.com/_webbedpiyush"
              className="hover:underline hover:underline-offset-4"
            >
              Twitter
            </Link>
          </p>
          <p>
            <Link
              href="mailto:piyushtiwarindls220@gmail.com"
              className="hover:underline hover:underline-offset-4"
            >
              Feedback
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
