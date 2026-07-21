import Link from 'next/link';

function PageFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-4xl mx-auto px-6 py-6 text-center">
      <div>© {new Date().getFullYear()} Mileta.</div>
      <div className="flex justify-center gap-4 mt-2">
        <Link href="/" className="text-black hover:underline">
          Privacy Policy
        </Link>
        <Link href="/" className="text-black hover:underline">
          Contact
        </Link>
      </div>
      <p className="text-sm mt-2 text-black">support@todoapp.com</p>
      </div>
    </footer>
  );
}

export default PageFooter;
