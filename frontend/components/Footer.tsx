import Link from "next/link";

function PageFooter() {
    return (
        <footer className="w-full text-center text-white border-t border-gray-300 p-6">
            <div>© {new Date().getFullYear()} Mileta.</div>
            <div className="flex justify-center gap-4 mt-2">
                <Link href="/" className="text-black hover:underline">Privacy Policy</Link>
                <Link href="/" className="text-black hover:underline">Contact</Link>
            </div>
            <p className="text-sm mt-2">support@todoapp.com</p>
        </footer>
    );
}

export default PageFooter;