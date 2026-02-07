import React from 'react'
import { Alert, Space } from 'antd';

const AlertComponent = () => {
    const onClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log(e, 'I was closed.');
    };

    return (
        <div>
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
        </div>
    )
}

export default Alert