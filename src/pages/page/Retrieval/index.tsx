import type { DrawerProps, RadioChangeEvent } from 'antd';
import {
  Button,
  Drawer,
  Radio,
  Space,
  Tabs,
  Collapse,
  Form,
  Input,
  Checkbox,
  Select,
  Card,
} from 'antd';
import React, { useState } from 'react';
import {
  PlusSquareTwoTone,
  DiffTwoTone,
  FileAddTwoTone,
  SwitcherTwoTone,
} from '@ant-design/icons';

const Retrieval: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
  const [collectionType, setCollectionType] = useState<any[]>([
    { label: 'cae', value: 'cae' },
    { label: 'cad', value: 'cad' },
    { label: 'cam', value: 'cam' },
  ]);
  const [type, setType] = useState('type');
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const tabChange = (key: string) => {
    console.log(key);
  };

  const CollapseChange = (key: string | string[]) => {
    console.log(key);
  };

  const typeChange = (e: any) => {
    console.log(e.target.value);
    setType(e.target.value);
  };
  const renderTypeList = () => (
    <>
      {collectionType &&
        collectionType.map((item: any) => (
          <Checkbox value={item.value}>{item.label}</Checkbox>
        ))}
    </>
  );

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        width={1000}
        // title="Basic Drawer"
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <Form form={form} labelCol={{ span: 2 }}>
          <Tabs defaultActiveKey="1" onChange={tabChange} type="card">
            <Tabs.TabPane tabKey="1" tab="搜索">
              <Form.Item name="keyWords" label="关键词">
                <Input placeholder="请输入关键词" />
              </Form.Item>
              <Collapse defaultActiveKey={['1']} onChange={CollapseChange}>
                <Collapse.Panel header="类型" key="1">
                  <Form.Item name="allType" label="类型">
                    <Radio.Group onChange={typeChange}>
                      <Radio value="type">
                        所有类型<a style={{ marginLeft: '20px' }}>更多选项</a>
                      </Radio>
                      <br />
                      <Radio
                        style={{ marginTop: '10px' }}
                        value="collectionType"
                      >
                        我收藏的类型
                        <a style={{ marginLeft: '20px' }}>添加</a>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item labelCol={{ span: 3 }} name="collectionTypeList">
                    <Checkbox.Group disabled={type === 'type'}>
                      {renderTypeList()}
                    </Checkbox.Group>
                  </Form.Item>
                </Collapse.Panel>
                <Collapse.Panel header="上下文" key="2">
                  <Form.Item name="allContent" label="所以上下文">
                    <Radio.Group onChange={typeChange}>
                      <Radio value="type">
                        所有类型<a style={{ marginLeft: '20px' }}>更多选项</a>
                      </Radio>
                      <br />
                      <Radio
                        style={{ marginTop: '10px' }}
                        value="collectionType"
                      >
                        我收藏的类型
                        <a style={{ marginLeft: '20px' }}>添加</a>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item labelCol={{ span: 3 }} name="collectionTypeList">
                    <Checkbox.Group disabled={type === 'type'}>
                      {renderTypeList()}
                    </Checkbox.Group>
                  </Form.Item>
                </Collapse.Panel>
                <Collapse.Panel header="条件" key="3">
                  <div
                    style={{ border: '1px solid #d9d9d9', minHeight: '200px' }}
                  >
                    <Space style={{ margin: '5px', padding: '5px' }}>
                      <Form.Item name="if">
                        <Select style={{ Width: '80px' }}>
                          <Select.Option value="||">或</Select.Option>
                          <Select.Option value="&&">于</Select.Option>
                          <Select.Option value="!"> 非</Select.Option>
                        </Select>
                      </Form.Item>
                      <div style={{ fontSize: '30px', marginBottom: '20px' }}>
                        <PlusSquareTwoTone />
                        <DiffTwoTone />
                        <FileAddTwoTone />
                        <SwitcherTwoTone />
                      </div>
                    </Space>
                  </div>
                </Collapse.Panel>
              </Collapse>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Drawer>
    </>
  );
};

export default Retrieval;
