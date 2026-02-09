"use client";
import React, { createContext, useContext, useState } from "react";

type Currency = "USD" | "INR" | "EUR";

const rates: Record<Currency, number> = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
};

const CurrencyContext = createContext<{
    currency: Currency;
    setCurrency: (c: Currency) => void;
    formatPrice: (price: number) => string;
} | null>(null);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<Currency>("USD");

    const formatPrice = (price: number) => {
        const converted = price * rates[currency];

        return new Intl.NumberFormat(
            currency === "INR" ? "en-IN" : "en-US",
            {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
            }
        ).format(converted);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
    return ctx;
};
