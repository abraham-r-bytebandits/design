'use client';
import { Card, Table, theme, Button, Pagination, Dropdown, Avatar, Space, Tag } from 'antd';
import { data, BestSellingProduct } from './columns2';
import { useCurrency } from '@/lib/currencyContext';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';

const Tables2 = () => {
    const { token } = theme.useToken();
    const [selectedTime, setSelectedTime] = useState('This Month');

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Today',
        },
        {
            key: '2',
            label: 'This Week',
        },
        {
            key: '3',
            label: 'This Month',
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const selectedItem = items.find(item => item?.key === e.key);
        if (selectedItem && 'label' in selectedItem) {
            setSelectedTime(selectedItem.label as string);
        }
    };

    const handleMenuSelect: MenuProps['onSelect'] = (e) => {
        const selectedItem = items.find(item => item?.key === e.key);
        if (selectedItem && 'label' in selectedItem) {
            setSelectedTime(selectedItem.label as string);
        }
    };

    // Get the default selected key based on initial state
    const getDefaultSelectedKey = () => {
        const item = items.find(item => item && 'label' in item && item.label === selectedTime);
        return item ? [item.key as string] : ['3'];
    };

    const { formatPrice } = useCurrency();

    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            key: "product",
            render: (product: BestSellingProduct["product"]) => (
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
            align: "right" as const,
            sorter: (a: BestSellingProduct, b: BestSellingProduct) => a.price - b.price,
            render: (price: number) => formatPrice(price),
        },
        {
            title: "Orders",
            dataIndex: "orders",
            key: "orders",
            align: "right" as const,
            sorter: (a: BestSellingProduct, b: BestSellingProduct) => a.orders - b.orders,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            align: "right" as const,
            render: (stock: number | "out") =>
                stock === "out" ? (
                    <Tag color="error">Out of stock</Tag>
                ) : (
                    <span>{stock}</span>
                ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            align: "right" as const,
            sorter: (a: BestSellingProduct, b: BestSellingProduct) => a.amount - b.amount,
            render: (amount: number) => (
                <span style={{ fontWeight: 500 }}>{formatPrice(amount)}</span>
            ),
        },
    ];

    return (
        <Card
            title="Best Selling Products"
            extra={
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: getDefaultSelectedKey(),
                        selectedKeys: getDefaultSelectedKey(),
                        onClick: handleMenuClick,
                        onSelect: handleMenuSelect,
                    }}
                    trigger={['click']}
                >
                    <Button type="text" className='flex items-center gap-2 p-0 hover:bg-transparent'>
                        <span className='font-bold text-gray-700'>SHORT BY:</span>
                        <span className='text-gray-600'>{selectedTime}</span>
                        <DownOutlined className='text-gray-500 text-xs' />
                    </Button>
                </Dropdown>
            }
            className='w-full max-w-full'
            styles={{
                body: {
                    padding: 0,
                }
            }}
        >
            <div className='w-full overflow-x-auto'>
                <Table<BestSellingProduct>
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{
                        x: 'max-content',
                    }}
                    size="middle"
                    className='w-full min-w-[800px] lg:min-w-0'
                    rowClassName="hover:bg-gray-50"
                />
            </div>

            {/* Footer Section */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-t border-gray-100'>
                <div className='text-sm text-gray-600'>
                    Showing <span className='font-semibold text-gray-900'>5</span> of{' '}
                    <span className='font-semibold text-gray-900'>25</span> results
                </div>

                <div className='w-full sm:w-auto'>
                    <Pagination
                        showSizeChanger
                        defaultCurrent={1}
                        total={25}
                        pageSizeOptions={['5', '10', '15', '20']}
                        defaultPageSize={5}
                        className='flex justify-end'
                        align="end"
                    />
                </div>
            </div>
        </Card>
    )
}

export default Tables2