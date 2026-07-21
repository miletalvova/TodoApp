import Link from 'next/link';

function PageFooter() {
  return (
    <footer className="border-t bg-gradient-to-l from-sky-200 to-white">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Mileta Lvova</p>

        <div className="flex gap-2 flex-wrap justify-center">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Next.js
          </span>

          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            React
          </span>

          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Tailwind CSS
          </span>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="https://github.com/miletalvova/TodoApp"
            className="text-sky-600 hover:text-sky-700"
          >
            GitHub
          </Link>

          <Link
            href="https://linkedin.com/in/mileta-lvova"
            className="text-sky-600 hover:text-sky-700"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default PageFooter;
