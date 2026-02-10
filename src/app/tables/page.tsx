"use client";
import React from 'react'
import Tables1 from './table1'
import { ConfigProvider, Divider, Select } from 'antd'
import Table2 from './table2'
import { useCurrency } from '@/lib/currencyContext';

const tables = () => {
    const { currency, setCurrency } = useCurrency();
    return (
        <div>
            <div className='w-full px-4 lg:px-8'>
                <div className='px-0 mt-10'>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mb-6">
                        <Select
                            value={currency}
                            style={{ width: 120 }}
                            onChange={setCurrency}
                            options={[
                                { value: "USD", label: "USD" },
                                { value: "INR", label: "INR" },
                                { value: "EUR", label: "EUR" },
                            ]}
                        />
                    </div>
                </div>
                <h1 className='text-3xl font-bold mb-4'>Tables</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                fontSize: 14,
                                padding: 8,
                                paddingContentVerticalLG: 12,
                                paddingContentHorizontalLG: 16,
                            },
                            Card: {
                                paddingLG: 24,
                                paddingSM: 16,
                            },
                            Pagination: {
                                colorPrimary: '#2BD0EA',
                                colorPrimaryHover: '#1DA1C1',
                            }
                        },
                    }}
                >
                    <Tables1 />
                    <Divider />
                    <Table2 />
                </ConfigProvider>
            </div>
        </div>
    )
}

export default tables