"use client";

import React, { useContext, useMemo, useState, useEffect } from "react";
import { Divider, Table, Select, Button, Grid } from "antd";
import type { TableProps } from "antd";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { DataType, data } from "@/lib/tableData";
import { useTableColumns } from "./ColumnTable";
import { useCurrency } from "@/lib/currencyContext";

const { useBreakpoint } = Grid;

const rowSelection: TableProps<DataType>["rowSelection"] = {
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === "Disabled User",
        name: record.name,
    }),
};

import RowContext, { RowContextProps } from "./RowContext";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props["data-row-key"] });

    const style: React.CSSProperties = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
    };

    const contextValue = useMemo<RowContextProps>(
        () => ({ setActivatorNodeRef, listeners }),
        [setActivatorNodeRef, listeners]
    );

    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    );
};

const ClientTable: React.FC = () => {
    const { currency, setCurrency } = useCurrency();
    const [tableData, setTableData] = React.useState<DataType[]>(data);
    const screens = useBreakpoint();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(!screens.md && !screens.lg && !screens.xl && !screens.xxl);
    }, [screens]);

    const columns = useTableColumns(tableData, setTableData, isMobile);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;

        setTableData((prev) => {
            const activeIndex = prev.findIndex((r) => r.key === active.id);
            const overIndex = prev.findIndex((r) => r.key === over.id);
            return arrayMove(prev, activeIndex, overIndex);
        });
    };

    return (
        <div className="2xl:container lg:w-[80%] w-full px-4 lg:px-0 mx-auto mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <Select
                    value={currency}
                    style={{ width: 120 }}
                    onChange={(val) => setCurrency(val)}
                    options={[
                        { value: "USD", label: "USD" },
                        { value: "INR", label: "INR" },
                        { value: "EUR", label: "EUR" },
                    ]}
                />
            </div>

            <Divider className="my-4" />

            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={tableData.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="overflow-x-auto">
                        <Table<DataType>
                            rowSelection={{ ...rowSelection }}
                            columns={columns}
                            bordered
                            scroll={{
                                x: isMobile ? "max-content" : "max-content",
                                y: isMobile ? undefined : undefined
                            }}
                            dataSource={tableData}
                            rowKey="key"
                            components={{
                                body: {
                                    row: Row,
                                },
                            }}
                            showSorterTooltip={{ target: "sorter-icon" }}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <div className="p-2 bg-gray-50 rounded">
                                        <p style={{ margin: 0 }}>{record.description}</p>
                                    </div>
                                ),
                            }}
                            pagination={{
                                showSizeChanger: true,
                                pageSizeOptions: ["10", "20", "50", "100"],
                                defaultPageSize: 10,
                                size: isMobile ? "small" : "middle",
                                simple: isMobile,
                            }}
                            size={isMobile ? "small" : "middle"}
                            className="min-w-[800px] md:min-w-0"
                        />
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default ClientTable;
