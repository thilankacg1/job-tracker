import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-lg font-bold">Job Tracker</h1>
                <div className="flex items-center gap-4">
                    <Image
                        src={session.user?.image ?? ""}
                        alt="avatar"
                        className="rounded-full"
                        width={32}
                        height={32}
                    />
                    <span className="text-sm text-gray-600">{session.user?.email}</span>
                    <SignOutButton />
                </div>
            </nav>
            <main className="p-6">{children}</main>
        </div>
    );
}