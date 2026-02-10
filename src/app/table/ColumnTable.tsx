import type { TableColumnsType } from "antd";
import { Tag, Flex, Button } from "antd";
import type { DataType } from "@/lib/tableData";
import { useTableSearch } from "./tableLogic";
import { useCurrency } from "@/lib/currencyContext";
import React, { useContext } from "react";
import { HolderOutlined } from "@ant-design/icons";
import RowContext from "./RowContext";

export const useTableColumns = (
    tableData: DataType[],
    setTableData: React.Dispatch<React.SetStateAction<DataType[]>>,
    isMobile: boolean = false
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

    const DragHandle: React.FC = () => {
        const { setActivatorNodeRef, listeners } = useContext(RowContext);
        return (
            <span
                ref={setActivatorNodeRef}
                {...listeners}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "move",
                    padding: "4px",
                    borderRadius: "4px",
                    background: "transparent",
                    touchAction: "none",
                    fontSize: "18px",
                }}
                tabIndex={0}
                aria-label="Drag row"
            >
                <HolderOutlined />
            </span>
        );
    };

    const baseColumns: TableColumnsType<DataType> = [
        {
            key: 'sort',
            width: isMobile ? 60 : 80,
            render: () => <DragHandle />
        },
        {
            title: "Name",
            dataIndex: "name",
            width: isMobile ? 120 : 160,
            render: (text: string) => <a>{text}</a>,
            sorter: (a: DataType, b: DataType) => a.name.length - b.name.length,
            ...getColumnSearchProps("name"),
            onCell: (record: DataType) => (isRowIncomplete(record) ? { colSpan: 5 } : {}),
        },
        {
            title: "Age",
            dataIndex: "age",
            width: isMobile ? 80 : 100,
            sorter: (a: DataType, b: DataType) => a.age - b.age,
            ...getColumnSearchProps("age"),
            onCell: (record: DataType) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
        },
        {
            title: "Address",
            dataIndex: "address",
            width: isMobile ? 180 : 220,
            ...getColumnSearchProps("address"),
            onCell: (record: DataType) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
            ellipsis: isMobile ? true : false,
        },
        {
            title: "Product",
            dataIndex: "product",
            width: isMobile ? 150 : 200,
            ...getColumnSearchProps("product"),
            onCell: (record: DataType) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
            ellipsis: isMobile ? true : false,
        },
        {
            title: "Category",
            dataIndex: "category",
            width: isMobile ? 120 : 150,
            ellipsis: isMobile ? true : false,
        },
        {
            title: "Brand",
            dataIndex: "brand",
            width: isMobile ? 120 : 150,
            ellipsis: isMobile ? true : false,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            width: isMobile ? 100 : 120,
            sorter: (a: DataType, b: DataType) => a.rating - b.rating,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            width: isMobile ? 100 : 120,
            sorter: (a: DataType, b: DataType) => a.stock - b.stock,
        },
        {
            title: "Price",
            dataIndex: "price",
            width: isMobile ? 120 : 140,
            render: (price: number) => formatPrice(price),
            sorter: (a: DataType, b: DataType) => a.price - b.price,
            onCell: (record: DataType) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            width: isMobile ? 200 : 260,
            fixed: isMobile ? undefined : ("end" as const),
            onFilter: (value: boolean | React.Key, record: DataType) => {
                // React.Key is string | number | bigint
                if (typeof value === "string" || typeof value === "number") {
                    return (record.tags || []).includes(String(value));
                }
                return false;
            },
            onCell: (record: DataType) => (isRowIncomplete(record) ? { colSpan: 0 } : {}),
            render: (_: string[], record: DataType) => {
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
                        {(record.tags || []).slice(0, isMobile ? 2 : undefined).map((tag: string) => {
                            const color = tagColorMap[tag] || "default";
                            return (
                                <Tag
                                    color={color}
                                    key={tag}
                                    style={isMobile ? { fontSize: "11px", padding: "2px 6px" } : {}}
                                >
                                    {isMobile ? tag.slice(0, 3).toUpperCase() : tag.toUpperCase()}
                                </Tag>
                            );
                        })}

                        {(record.tags || []).length > 2 && isMobile && (
                            <Tag style={{ fontSize: "11px", padding: "2px 6px" }}>
                                +{(record.tags || []).length - 2}
                            </Tag>
                        )}

                        {editingRow === record.key ? (
                            <input
                                autoFocus
                                style={{
                                    width: isMobile ? 70 : 90,
                                    marginLeft: 4,
                                    padding: isMobile ? "2px 4px" : "4px 8px",
                                    fontSize: isMobile ? "12px" : "14px"
                                }}
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
                                style={{
                                    cursor: "pointer",
                                    borderStyle: "dashed",
                                    fontSize: isMobile ? "11px" : "12px",
                                    padding: isMobile ? "2px 6px" : "4px 8px"
                                }}
                                onClick={() => {
                                    setEditingRow(record.key);
                                    setInputValue("");
                                }}
                            >
                                {isMobile ? "+" : "+ New Tag"}
                            </Tag>
                        )}
                    </Flex>
                );
            },
        },
    ];

    // For mobile, show fewer columns to prevent overcrowding
    if (isMobile) {
        return baseColumns.filter(col =>
            ('dataIndex' in col && (col.dataIndex === 'name' ||
                col.dataIndex === 'age' ||
                col.dataIndex === 'product' ||
                col.dataIndex === 'price' ||
                col.dataIndex === 'tags')) ||
            ('key' in col && col.key === 'sort')
        ) as TableColumnsType<DataType>;
    }

    return baseColumns;
};