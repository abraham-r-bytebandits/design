"use client";
import { Anchor, Breadcrumb, Col, MenuProps, Pagination, Row, Space, Steps, Tabs, TabsProps, Menu } from 'antd';
import { Separator } from '@/components/ui/separator';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Item 1',
                type: 'group',
                children: [
                    { key: '1', label: 'Option 1' },
                    { key: '2', label: 'Option 2' },
                ],
            },
            {
                key: 'g2',
                label: 'Item 2',
                type: 'group',
                children: [
                    { key: '3', label: 'Option 3' },
                    { key: '4', label: 'Option 4' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: 'Option 7' },
                    { key: '8', label: 'Option 8' },
                ],
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
];

const page = () => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Tab 1',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Tab 2',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Tab 3',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <div className='2xl:container w-[80%] mx-auto mt-10'>
            <div>
                <h1 className="text-3xl font-bold mb-4">Navigation Component from Ant Design</h1>
                <Space>
                    <h4 className='text-lg'>Breadcrumb -</h4>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Home',
                            },
                            {
                                title: <a href="">Application Center</a>,
                            },
                            {
                                title: <a href="">Application List</a>,
                            },
                            {
                                title: 'An Application',
                            },
                        ]}
                    />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Tabs defaultActiveKey="1" items={tabItems} />
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>Pagination -</h4>
                    <Pagination defaultCurrent={1} total={50} />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>

                <h4 className='text-lg'>Steps -</h4>
                <div>
                    <Steps orientation="horizontal" current={1} items={tabItems} />
                </div>
            </div>

            <Separator className='my-10' />

            <h4 className='text-lg'>Anchor</h4>
            <Row>
                <Col span={22}>
                    <div id="part-1" style={{ height: '100vh', background: 'rgba(231, 7, 7, 0.89)' }} />
                    <div id="part-2" style={{ height: '100vh', background: 'rgb(0, 255, 0)' }} />
                    <div id="part-3" style={{ height: '100vh', background: 'rgba(0, 0, 255, 0.91)' }} />
                </Col>
                <Col span={2}>
                    <Anchor
                        items={[
                            {
                                key: 'part-1',
                                href: '#part-1',
                                title: 'Part 1',
                            },
                            {
                                key: 'part-2',
                                href: '#part-2',
                                title: 'Part 2',
                            },
                            {
                                key: 'part-3',
                                href: '#part-3',
                                title: 'Part 3',
                            },
                        ]}
                    />
                </Col>
            </Row>

            <Separator className='my-10' />

            <h4 className='text-lg'>Menu</h4>
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={menuItems}
            />

        </div>
    )
}

export default page