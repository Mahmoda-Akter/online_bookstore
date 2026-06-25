import Sidebar from "@/component/deshboards/Sideber";

export default function DashboardLayout({ children }) {
    return (
        <div className="h-screen grid grid-cols-4 bg-background">

            <div className="h-screen flex flex-1  overflow-hidden">
                <div className="">
                    <Sidebar></Sidebar>
                </div>
            </div>
            <div className=" col-span-3 overflow-y-auto">
                <main className="p-10">
                    {/* <div className="border border-red-500 w-full">
                        
                    </div> */}
                    {children}</main>
            </div>

        </div>
    );
}