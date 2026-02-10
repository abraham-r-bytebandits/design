"use client";
import { Table, Tag, Avatar, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCurrency } from '@/lib/currencyContext';

export interface BestSellingProduct {
    key: string;
    product: {
        name: string;
        image: string;
        date: string;
    };
    price: number;
    orders: number;
    stock: number | "out";
    amount: number;
}

export const data: BestSellingProduct[] = [
    {
        key: "1",
        product: {
            name: "Branded T-Shirts",
            image: "https://picsum.photos/id/1062/100/100", // t-shirt / clothing
            date: "24 Apr 2021",
        },
        price: 29.0,
        orders: 62,
        stock: 510,
        amount: 1798,
    },
    {
        key: "2",
        product: {
            name: "Bentwood Chair",
            image: "https://picsum.photos/id/1076/100/100", // chair / furniture
            date: "19 Mar 2021",
        },
        price: 85.2,
        orders: 35,
        stock: "out",
        amount: 2982,
    },
    {
        key: "3",
        product: {
            name: "Borosil Paper Cup",
            image: "https://picsum.photos/id/1060/100/100", // cup / product
            date: "01 Mar 2021",
        },
        price: 14.0,
        orders: 80,
        stock: 749,
        amount: 1120,
    },
    {
        key: "4",
        product: {
            name: "One Seater Sofa",
            image: "https://picsum.photos/id/1080/100/100", // sofa / furniture
            date: "11 Feb 2021",
        },
        price: 127.5,
        orders: 56,
        stock: "out",
        amount: 7140,
    },
    {
        key: "5",
        product: {
            name: "Stillbird Helmet",
            image: "https://picsum.photos/id/1059/100/100",
            date: "17 Jan 2021",
        },
        price: 54.0,
        orders: 74,
        stock: 805,
        amount: 3996,
    },
];




export const columns: ColumnsType<BestSellingProduct> = [
    {
        title: "Product",
        dataIndex: "product",
        key: "product",
        render: (product) => (
            <Space>
                <Avatar
                    shape="circle"
                    size={52}
                    className="rounded-xl"
                    src={product.image}
                    alt={product.name}
                />
                <div>
                    <div style={{ fontWeight: 500 }}>{product.name}</div>
                    <div style={{ fontSize: 12, color: "#8c8c8c" }}>{product.date}</div>
                </div>
            </Space>
        ),
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "right",
        sorter: (a, b) => a.price - b.price,
        render: (price: number) => {
            const { formatPrice } = useCurrency();
            return (
                <div className="text-right">
                    <div className="font-medium">{formatPrice(price)}</div>
                    <div className="text-xs text-gray-400">Price</div>
                </div>
            );
        },
    },
    {
        title: "Orders",
        dataIndex: "orders",
        key: "orders",
        align: "right",
        sorter: (a, b) => a.orders - b.orders,
        render: (orders: number) => (
            <div className="text-right">
                <div className="font-medium">{orders}</div>
                <div className="text-xs text-gray-400">Orders</div>
            </div>
        ),
    },
    {
        title: "Stock",
        dataIndex: "stock",
        key: "stock",
        align: "right",
        render: (stock: number | "out") => (
            <div className="text-right">
                {stock === "out" ? (
                    <>
                        <Tag color="error">Out of stock</Tag>
                        <div className="text-xs text-gray-400 mt-1">Stock</div>
                    </>
                ) : (
                    <>
                        <div className="font-medium">{stock}</div>
                        <div className="text-xs text-gray-400">Stock</div>
                    </>
                )}
            </div>
        ),
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        sorter: (a, b) => a.amount - b.amount,
        render: (amount: number) => (
            <div className="text-right">
                <div className="font-medium">${amount.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Amount</div>
            </div>
        ),
    },
];