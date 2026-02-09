"use client";

import React, { useContext, useMemo } from "react";
import { Divider, Table, Select, Button } from "antd";
import type { TableProps } from "antd";
import { HolderOutlined } from "@ant-design/icons";
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

const rowSelection: TableProps<DataType>["rowSelection"] = {
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === "Disabled User",
        name: record.name,
    }),
};

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
    listeners?: any;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);

    return (
        <Button
            type="text"
            size="small"
            icon={<HolderOutlined />}
            style={{ cursor: "move" }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    );
};

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

const App: React.FC = () => {
    const { currency, setCurrency } = useCurrency();
    const [tableData, setTableData] = React.useState<DataType[]>(data);

    const columns = useTableColumns(tableData, setTableData);

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;

        setTableData((prev) => {
            const activeIndex = prev.findIndex((r) => r.key === active.id);
            const overIndex = prev.findIndex((r) => r.key === over.id);
            return arrayMove(prev, activeIndex, overIndex);
        });
    };

    return (
        <div className="2xl:container lg:w-[80%] px-4 lg:px-0 mx-auto mt-10">
            <Select
                value={currency}
                style={{ width: 120, marginBottom: 16 }}
                onChange={(val) => setCurrency(val)}
                options={[
                    { value: "USD", label: "USD" },
                    { value: "INR", label: "INR" },
                    { value: "EUR", label: "EUR" },
                ]}
            />

            <Divider />

            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={tableData.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table<DataType>
                        rowSelection={{ ...rowSelection }}
                        columns={columns}
                        bordered
                        scroll={{ x: "max-content" }}
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
                                <p style={{ margin: 0 }}>{record.description}</p>
                            ),
                        }}
                        pagination={{
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "50", "100"],
                            defaultPageSize: 10,
                        }}
                    />
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default App;
