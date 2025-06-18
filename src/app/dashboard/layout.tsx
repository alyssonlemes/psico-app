import Sidebar from "@/components/Sidebar/Sidebar";
import MobileSidebar from "@/components/MobileSidebar/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar desktop */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>
      {/* Sidebar mobile */}
      <MobileSidebar />
      <main className="flex-1 overflow-hidden pt-16 md:pt-0">
        <div className="h-full overflow-auto p-4">
          {children}
        </div>
      </main>
    </div>
  );
}