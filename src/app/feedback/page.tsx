'use client';

import {
    Button,
    Drawer,
    DrawerProps,
    Flex,
    message,
    Modal,
    Popconfirm,
    PopconfirmProps,
    Radio,
    RadioChangeEvent,
    Space,
    Spin,
    Tooltip,
    Skeleton,
} from 'antd';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';

const Feedback = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] =
        useState<DrawerProps['placement']>('left');

    // simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // message handlers
    const success = () =>
        messageApi.success('This is a success message');

    const error = () =>
        messageApi.error('This is an error message');

    const warning = () =>
        messageApi.warning('This is a warning message');

    const confirm: PopconfirmProps['onConfirm'] = () => {
        messageApi.success('Click on Yes');
    };

    const cancel: PopconfirmProps['onCancel'] = () => {
        messageApi.error('Click on No');
    };

    return (
        <div className="2xl:container w-[80%] mx-auto mt-10">
            {contextHolder}

            <h1 className="text-3xl font-bold mb-4">
                Feedback Component from Ant Design
            </h1>

            <Separator className="my-10" />

            {/* ===== Messages ===== */}
            {loading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
                <Space>
                    <h4 className="text-lg">Feedback Messages -</h4>
                    <Button onClick={success}>Success</Button>
                    <Button onClick={error}>Error</Button>
                    <Button onClick={warning}>Warning</Button>
                </Space>
            )}

            <Separator className="my-10" />

            {/* ===== Modal ===== */}
            {loading ? (
                <Skeleton.Button active size="large" />
            ) : (
                <>
                    <Space>
                        <h4 className="text-lg">Modal -</h4>
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>
                            Open Modal
                        </Button>
                    </Space>

                    <Modal
                        title="Basic Modal"
                        open={isModalOpen}
                        onOk={() => setIsModalOpen(false)}
                        onCancel={() => setIsModalOpen(false)}
                    >
                        <p>contents...</p>
                    </Modal>
                </>
            )}

            <Separator className="my-10" />

            {/* ===== Drawer ===== */}
            {loading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
                <>
                    <Space>
                        <h4 className="text-lg">Drawer -</h4>
                        <Radio.Group
                            value={placement}
                            onChange={(e: RadioChangeEvent) =>
                                setPlacement(e.target.value)
                            }
                        >
                            <Radio value="top">top</Radio>
                            <Radio value="right">right</Radio>
                            <Radio value="bottom">bottom</Radio>
                            <Radio value="left">left</Radio>
                        </Radio.Group>
                        <Button type="primary" onClick={() => setOpen(true)}>
                            Open
                        </Button>
                    </Space>

                    <Drawer
                        title="Basic Drawer"
                        placement={placement}
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <p>Some contents...</p>
                    </Drawer>
                </>
            )}

            <Separator className="my-10" />

            {/* ===== Popconfirm ===== */}
            {loading ? (
                <Skeleton.Button active />
            ) : (
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Space>
                        <h4 className="text-lg">Popconfirm -</h4>
                        <Button danger>Delete</Button>
                    </Space>
                </Popconfirm>
            )}

            <Separator className="my-10" />

            {/* ===== Tooltip ===== */}
            {loading ? (
                <Skeleton.Button active />
            ) : (
                <Space>
                    <h4 className="text-lg">Tooltip -</h4>
                    <Tooltip title="Hello, Ant Design!">
                        <Button type="primary">Button</Button>
                    </Tooltip>
                </Space>
            )}

            <Separator className="my-10" />

            {/* ===== Spin ===== */}
            {loading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
                <Flex align="center" gap="middle">
                    <h4 className="text-lg">Spin -</h4>
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                    <Spin indicator={<LoadingOutlined spin />} />
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                    <Spin
                        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                    />
                </Flex>
            )}
        </div>
    );
};

export default Feedback;
