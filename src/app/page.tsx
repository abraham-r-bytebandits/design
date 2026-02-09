
"use client";
import { Separator } from '@/components/ui/separator';
import { Alert, Avatar, Badge, Calendar, Space, Button, Skeleton, theme, Image, QRCode, Input, Timeline, Tree, Tooltip, Empty, Result } from 'antd';
import { ClockCircleOutlined, DownOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import TypographyComponent from '@/components/Typography';
import { useState, useEffect, } from 'react';
import TagUI from '@/components/TagUI';
import type { TreeDataNode, TreeProps } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { token } = theme.useToken();
  const [text, setText] = useState('Abraham');
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e, 'I was closed.');
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="2xl:container w-[80%] mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Ant Design Components</h1>
      <Separator className='my-6' />
      <div>
        <Space>
          <h4 className='text-lg'>Table -</h4>
          <Button type="primary" href="/table">
            Link
          </Button>
        </Space>
      </div>
      <Separator className='my-6' />
      <div>
        <Space>
          <h4 className='text-lg'>shadCN -</h4>
          <Button type="primary" href="/shadCN">
            Link
          </Button>
        </Space>
      </div>
      <Separator className='my-6' />

      {loading ? (
        <Skeleton.Button active />
      ) : (
        <Space>
          <h4 className='text-lg'>Buttons - </h4>
          <Button type="primary">Primary</Button>
          <Button >Default</Button>
        </Space>
      )}

      <Separator className='my-10' />

      <div>
        <Space>
          <h4 className='text-lg'>Alerts - </h4>
          <Alert
            title="Warning Title"
            type="warning"
            closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
          />
          <br />
          <Alert
            title="Success Title"
            type="success"
            closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
          />
          <br />
          <Alert
            title="Info Title"
            type="info"
            closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
          />
          <br />
          <Alert
            title="Error Title"
            type="error"
            closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
          />
        </Space>
      </div>

      <Separator className='my-10' />

      {/* Badge */}
      <div>
        <Space size="middle">
          <h4 className='text-lg'>Badges - </h4>
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" size="large" />
          </Badge>
          <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
            <Avatar shape="square" size="large" />
          </Badge>
        </Space>
      </div>

      <Separator className='my-10' />

      <TypographyComponent />

      <Separator className='my-10' />

      <div>
        <Space>
          <h4 className='text-lg'>Form -</h4>
          <Button type="primary" href="/form">
            Link
          </Button>
        </Space>
      </div>

      <Separator className='my-10' />

      <div>
        <Space>
          <h4 className='text-lg'>Navigation -</h4>
          <Button type="primary" href="/navigation">
            Link
          </Button>
        </Space>
      </div>
      <Separator className='my-10' />
      <div>
        <Space>
          <h4 className='text-lg'>Feedback -</h4>
          <Button type="primary" href="/feedback">
            Link
          </Button>
        </Space>
      </div>

      <Separator className='my-10' />

      <div style={wrapperStyle}>
        <h4 className='text-lg'>Calendar</h4>
        <Calendar fullscreen={false} />
      </div>

      <Separator className='my-10' />

      <div>
        <h4 className='text-lg'>Image</h4>
        <Image
          width={200}
          alt="basic"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>

      <Separator className='my-10' />

      <Space vertical align="center">
        <QRCode value={text || '-'} />
        <Input
          placeholder="-"
          maxLength={60}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Space>

      <Separator className='my-10' />

      <div>
        <Space>
          <h4 className='text-lg'>Tag - </h4>
          <TagUI />
        </Space>
      </div>

      <Separator className='my-10' />

      <div>
        <h4 className='text-lg'>Timeline</h4>
        <Timeline
          items={[
            {
              content: 'Create a services site 2015-09-01',
            },
            {
              content: 'Solve initial network problems 2015-09-01',
            },
            {
              content: 'Technical testing 2015-09-01',
            },
            {
              content: 'Network problems being solved 2015-09-01',
            },
          ]}
        />
      </div>
      <Separator className='my-10' />
      <div>
        <h4 className='text-lg'>Tree</h4>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>

      <Separator className='my-10' />

      <div>
        <Space wrap size={16}>
          <h4 className='text-lg'>Avatar -</h4>
          <Avatar size={64} icon={<UserOutlined />} />
          <Avatar size="large" icon={<UserOutlined />} />
          <Avatar icon={<UserOutlined />} />
          <Avatar size="small" icon={<UserOutlined />} />
          <Avatar size={14} icon={<UserOutlined />} />
          <Avatar.Group>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <a href="https://ant.design">
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            </a>
            <Tooltip title="Ant User" placement="top">
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Tooltip>
            <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
          </Avatar.Group>
        </Space>
      </div>

      <Separator className='my-10' />

      <div>
        <Empty />
      </div>

      <Separator className='my-10' />


      <div>
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      </div>





    </div>
  );
}
