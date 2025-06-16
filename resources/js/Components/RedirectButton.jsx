import { useState } from "react";
import { Link } from "@inertiajs/react";
import { FaSpinner } from "react-icons/fa";

export default function RedirectButton({
    className = "",
    disabled,
    children,
    href,
    ...props
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Link
            {...props}
            href={href}
            className={
                `inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                    disabled && "opacity-25 cursor-not-allowed"
                } ` + className
            }
            onClick={handleClick}
            disabled={disabled}
        >
            {isLoading ? (
                <FaSpinner className="text-white animate-spin" />
            ) : (
                children
            )}
        </Link>
    );
}
