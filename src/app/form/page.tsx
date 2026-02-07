"use client";
import { Input, Space, InputNumberProps, InputNumber, Flex, Radio, Rate, Select, Button, Switch, Checkbox, AutoComplete, AutoCompleteProps, DatePicker, Upload } from 'antd';
import { Separator } from '@/components/ui/separator';
import type { CheckboxGroupProps, CheckboxProps, } from 'antd/es/checkbox';
import { useState } from 'react';
import React from 'react';
import UploadOutlined from '@ant-design/icons/lib/icons/UploadOutlined';
import type { UploadProps } from 'antd';
import FormUI from './Form';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const props: UploadProps = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
        console.log('Your upload file:', file);
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file as File);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    },
};

const FormPage = () => {
    const [option, setOption] = React.useState<AutoCompleteProps['options']>([]);
    const [value, setValue] = useState(1);
    const onChange: InputNumberProps['onChange'] = (value) => {
        console.log('changed', value);
    };

    const options: CheckboxGroupProps<string>['options'] = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
    ];

    const sharedProps = {
        mode: 'spinner' as const,
        min: 1,
        max: 10,
        defaultValue: 3,
        onChange,
        style: { width: 150 },
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChanges = (list: string[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    const handleSearch = (value: string) => {
        setOption(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        });
    };

    return (
        <div className="2xl:container w-[80%] mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">Form Component from Ant Design</h1>
            <Space>
                <h4 className='text-lg'>Input Fields - </h4>
                <Input placeholder="Basic usage" />
                <Input placeholder="Outlined" />
                <Input placeholder="Filled" variant="filled" />
                <Input placeholder="Borderless" variant="borderless" />
                <Input placeholder="Underlined" variant="underlined" />
            </Space>
            <Separator className='my-10' />
            <Space>
                <h4 className='text-lg'>Input Number - </h4>
                <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                <InputNumber {...sharedProps} placeholder="Outlined" />
                <InputNumber {...sharedProps} variant="filled" placeholder="Filled" />
            </Space>
            <Separator className='my-10' />
            <div className='max-w-[70%]'>
                <h4 className='text-lg'>Radio Buttons - </h4>
                <Flex vertical gap="middle">
                    <Radio.Group block options={options} defaultValue="Apple" />
                    <Radio.Group
                        block
                        options={options}
                        defaultValue="Apple"
                        optionType="button"
                        buttonStyle="solid"
                    />
                    <Radio.Group block options={options} defaultValue="Pear" optionType="button" />
                </Flex>
            </div>
            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>Rate - </h4>
                    <Rate allowHalf defaultValue={2.5} />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Space wrap>
                    <h4 className='text-lg'>Select - </h4>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        disabled
                        options={[{ value: 'lucy', label: 'Lucy' }]}
                    />
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        loading
                        options={[{ value: 'lucy', label: 'Lucy' }]}
                    />
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: 'lucy', label: 'Lucy' }]}
                        placeholder="select it"
                    />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>Switch - </h4>
                    <Switch defaultChecked />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>Checkbox - </h4>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        Check all
                    </Checkbox>
                    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChanges} />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>AutoComplete - </h4>
                    <AutoComplete
                        style={{ width: 200 }}
                        showSearch={{ onSearch: handleSearch }}
                        placeholder="input here"
                        options={option}
                    />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>DatePicker - </h4>
                    <DatePicker onChange={onChange} needConfirm />
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <Space>
                    <h4 className='text-lg'>Upload - </h4>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Space>
            </div>

            <Separator className='my-10' />

            <div>
                <FormUI />
            </div>

        </div>
    )
}

export default FormPage