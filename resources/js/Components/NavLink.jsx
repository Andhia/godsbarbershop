import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none uppercase " +
                (active
                    ? "border-yellow-700 font-bold text-white focus:border-slate-700"
                    : "border-transparent text-white hover:border-gray-300 hover:text-slate-300 focus:border-gray-300 focus:font-bold") +
                className
            }
        >
            {children}
        </Link>
    );
}
