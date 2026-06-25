

import {
    FaBars,
    FaBell,
    FaEnvelope,
    FaCog,
    FaHome,
    FaSearch,
    FaUser
} from "react-icons/fa";
import {
    FaChartLine,
    FaBook,
    FaTruck,
    FaUsers,
    FaStar,
} from "react-icons/fa";

import { BiMoney } from "react-icons/bi";

import { Button, Drawer } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const Sidebar =async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const role = user?.role || "seller";

    const dashboardItems = {
        seller: [
            {
                icon: FaChartLine,
                label: "Overview",
                link: "/deshboard/seller",
            },
            {
                icon: FaBook,
                label: "Add Book",
                link: "/deshboard/seller/add-book",
            },
            {
                icon: FaBook,
                label: "Manage Inventory",
                link: "/deshboard/seller/manage-inventory",
            },
            {
                icon: FaTruck,
                label: "Manage Deliveries",
                link: "/deshboard/seller/manage-deliveries",
            },
        ],

        buyer: [
            {
                icon: FaChartLine,
                label: "Overview",
                link: "/deshboard/buyer",
            },
            {
                icon: FaTruck,
                label: "Delivery History",
                link: "/deshboard/buyer/delivery-history",
            },
            {
                icon: FaBook,
                label: "My Reading List",
                link: "/deshboard/buyer/reading-list",
            },
            {
                icon: FaStar,
                label: "My Reviews",
                link: "/deshboard/buyer/reviews",
            },
        ],

        admin: [
            {
                icon: FaChartLine,
                label: "Overview",
                link: "/deshboard/admin",
            },
            {
                icon: FaUsers,
                label: "Manage Users",
                link: "/deshboard/admin/users",
            },
            {
                icon: FaBook,
                label: "Book Approval",
                link: "/deshboard/admin/book-approval",
            },
            {
                icon: FaBook,
                label: "Manage Books",
                link: "/deshboard/admin/books",
            },
            {
                icon: BiMoney,
                label: "Transactions",
                link: "/deshboard/admin/transactions",
            },
        ],
    };
    const navItems = dashboardItems[role]
    // [
    //     { icon: FaHome, label: "Home" },
    //     { icon: FaSearch, label: "Search" },
    //     { icon: FaBell, label: "Notifications" },
    //     { icon: FaEnvelope, label: "Messages" },
    //     { icon: FaUser, label: "Profile" },
    //     { icon: FaCog, label: "Settings" },
    // ];

    const MenuItems = () => (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.link}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-default"
                >
                    <item.icon className="size-5" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 h-screen border-r p-4">
                <h2 className="font-bold text-xl mb-5">
                    Navigation
                </h2>

                <MenuItems />
            </aside>

            {/* Mobile Drawer */}
            <div className="md:hidden p-4">
                <Drawer>
                    <Button variant="flat">
                        <FaBars />
                        Menu
                    </Button>

                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger />

                                <Drawer.Header>
                                    <Drawer.Heading>
                                        Navigation
                                    </Drawer.Heading>
                                </Drawer.Header>

                                <Drawer.Body>
                                    <MenuItems />
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
};

export default Sidebar;