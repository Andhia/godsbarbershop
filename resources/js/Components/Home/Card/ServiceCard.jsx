import React from "react";

const ServiceCard = ({ image, name, description, price }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    };

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2">
            <div className="relative overflow-hidden">
                <img
                    src={`/storage/${image}`}
                    alt={name}
                    className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

                {/* Price Tag */}
                {price && (
                    <div className="absolute top-4 right-4 bg-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatCurrency(price)}
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brown bg-opacity-90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold mb-3">{name}</h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            {description}
                        </p>
                        {price && (
                            <div className="mt-4 text-lg font-semibold">
                                {formatCurrency(price)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brown transition-colors duration-300">
                    {name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {description}
                </p>

                {price && (
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-brown">
                            {formatCurrency(price)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;
