import Link from "next/link";

export default function Home() {
  return (
    <div>
<Link href={'/admin'} className="flex items-center justify-center p-6 border-4 rounded-xl bg-amber-50">Admin Panel</Link>
    </div>
  );
}
