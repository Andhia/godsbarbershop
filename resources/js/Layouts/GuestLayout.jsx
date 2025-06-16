import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import RedirectButton from "@/Components/RedirectButton";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function GuestLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen ">
            <nav className="border-b bg-neutral-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex w-full">
                            <div className="flex items-center w-1/3 shrink-0">
                                <Link href="/">
                                    <ApplicationLogo className="block w-auto text-white fill-current h-9" />
                                </Link>
                            </div>

                            <div className="hidden w-2/3 space-x-8 sm:-my-px sm:ms-10 sm:flex sm:justify-end">
                                <NavLink
                                    href={route("home")}
                                    active={route().current("home")}
                                >
                                    HOME
                                </NavLink>
                                <NavLink
                                    href={route("about")}
                                    active={route().current("about")}
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    href={route("service")}
                                    active={route().current("service")}
                                >
                                    Service
                                </NavLink>
                                <NavLink
                                    href={route("contact")}
                                    active={route().current("contact")}
                                >
                                    Contact
                                </NavLink>
                                <div className="flex items-center justify-center p-2">
                                    <RedirectButton
                                        href={route("booking.create")}
                                        className=" bg-brown text-white"
                                    >
                                        BOOKING
                                    </RedirectButton>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("home")}
                            active={route().current("home")}
                        >
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("about")}
                            active={route().current("about")}
                        >
                            About
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("service")}
                            active={route().current("service")}
                        >
                            Service
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("contact")}
                            active={route().current("contact")}
                        >
                            Contact
                        </ResponsiveNavLink>
                        <div className="px-4 py-2">
                            <RedirectButton
                                href={route("booking.create")}
                                className="w-full bg-brown"
                            >
                                BOOKING
                            </RedirectButton>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
