'use client';
import { Card, Table, theme, Button, Pagination } from 'antd';
import { Order } from './columns';
import { columns, data } from './columns';
import { FileTextOutlined } from '@ant-design/icons';

const Tables1 = () => {
    const { token } = theme.useToken();

    return (
        <Card
            title="Recent Orders"
            extra={
                <Button
                    className='text-[#2BD0EA] bg-[#E8FAFD] border-none hover:text-blue-700 hover:bg-[#D0F5FA] flex items-center gap-2'
                    icon={<FileTextOutlined />}
                >
                    Generate Report
                </Button>
            }
            className='w-full max-w-full'
            styles={{
                body: {
                    padding: 0,
                }
            }}
        >
            <div className='w-full overflow-x-auto'>
                <Table<Order>
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

            {/* Footer Section - Improved */}
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

export default Tables1