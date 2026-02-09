import type { TableColumnsType } from "antd";
import { Tag, Flex } from "antd";
import type { DataType } from "@/lib/tableData";
import { useTableSearch } from "./tableLogic";
import { useCurrency } from "@/lib/currencyContext";
import React from "react";
import DragHandle from "./page";

export const useTableColumns = (
    tableData: DataType[],
    setTableData: React.Dispatch<React.SetStateAction<DataType[]>>
): TableColumnsType<DataType> => {
    const { getColumnSearchProps } = useTableSearch();
    const { formatPrice } = useCurrency();

    const [editingRow, setEditingRow] = React.useState<string | null>(null);
    const [inputValue, setInputValue] = React.useState("");

    const addTag = (recordKey: string, newTag: string) => {
        if (!newTag.trim()) return;
        setTableData((prev) =>
            prev.map((row) =>
                row.key === recordKey
                    ? { ...row, tags: [...(row.tags || []), newTag.toLowerCase()] }
                    : row
            )
        );
    };

    const isRowIncomplete = (record: DataType) => {
        return !record.product || record.price == null || record.product.trim() === "";
    };

    return [
        // ✅ Drag handle column (NEW)
        {
            key: "sort",
            width: 48,
            fixed: "start",
            align: "center",
            render: () => <DragHandle />,
        },

        {
            title: "Name",
            dataIndex: "name",
            width: 160,
            fixed: "start",
            render: (text: string) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps("name"),
            onCell: (record) => (isRowIncomplete(record) ? { colSpan: 6 } : {}),
        },
        {
            title: "Age",
            dataIndex: "age",
            width: 100,
            fixed: "start",
            sorter: (a, b) => a.age - b.age,
            ...getColumnSearchProps("age"),
            onCell: (record) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
        },
        {
            title: "Address",
            dataIndex: "address",
            width: 220,
            ...getColumnSearchProps("address"),
            onCell: (record) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
        },
        {
            title: "Product",
            dataIndex: "product",
            width: 200,
            ...getColumnSearchProps("product"),
            onCell: (record) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
        },
        {
            title: "Category",
            dataIndex: "category",
            width: 150,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            width: 150,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            width: 120,
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            width: 120,
            sorter: (a, b) => a.stock - b.stock,
        },
        {
            title: "Price",
            dataIndex: "price",
            width: 140,
            render: (price: number) => formatPrice(price),
            sorter: (a, b) => a.price - b.price,
            onCell: (record) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            width: 260,
            fixed: "end",
            onFilter: (value, record) => record.tags.includes(value as string),
            onCell: (record) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
            render: (_: string[], record) => {
                const tagColorMap: Record<string, string> = {
                    premium: "gold",
                    featured: "blue",
                    budget: "volcano",
                    popular: "green",
                    successful: "geekblue",
                    active: "cyan",
                    new: "purple",
                };

                return (
                    <Flex gap="small" align="center" wrap>
                        {(record.tags || []).map((tag) => {
                            const color = tagColorMap[tag] || "default";
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}

                        {editingRow === record.key ? (
                            <input
                                autoFocus
                                style={{ width: 90, marginLeft: 4 }}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={() => {
                                    if (inputValue.trim()) addTag(record.key, inputValue);
                                    setEditingRow(null);
                                    setInputValue("");
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (inputValue.trim()) addTag(record.key, inputValue);
                                        setEditingRow(null);
                                        setInputValue("");
                                    } else if (e.key === "Escape") {
                                        setEditingRow(null);
                                        setInputValue("");
                                    }
                                }}
                            />
                        ) : (
                            <Tag
                                style={{ cursor: "pointer", borderStyle: "dashed" }}
                                onClick={() => {
                                    setEditingRow(record.key);
                                    setInputValue("");
                                }}
                            >
                                + New Tag
                            </Tag>
                        )}
                    </Flex>
                );
            },
        },
    ];
};
