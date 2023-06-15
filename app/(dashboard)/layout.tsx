import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <span className="text-3xl">Side</span>
      </aside>

      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
