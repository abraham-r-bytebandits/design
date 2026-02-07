import React from 'react';
import { Space, Typography } from 'antd';

const TypographyComponent = () => {
    const { Text, Link } = Typography;
    return (
        <div>
            <Space>
                <h4 className='text-lg'>Typography -</h4>
                <Text>(default)</Text>
                <Text type="secondary">(secondary)</Text>
                <Text type="success">(success)</Text>
                <Text type="warning">(warning)</Text>
                <Text type="danger">(danger)</Text>
                <Text disabled>(disabled)</Text>
                <Text mark>(mark)</Text>
                <Text code>(code)</Text>
                <Text keyboard>(keyboard)</Text>
                <Text underline>(underline)</Text>
                <Text delete>(delete)</Text>
                <Text strong>(strong)</Text>
                <Text italic>(italic)</Text>
                <Link href="https://ant.design" target="_blank">
                    (Link)
                </Link>
            </Space>
        </div>
    )
}

export default TypographyComponent