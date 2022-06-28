import React, { useState, useEffect } from 'react';
import {
  Modal,
  Table,
  Button,
  Row,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Space,
  InputNumber,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
interface AddModalProps {
  data: any;
  setTableData: any;
  searchParams:any[];
  setSearchParams:any
}

const AddModal: React.FC<AddModalProps> = ({
  data,
  setTableData,
  searchParams,
  setSearchParams
}) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const onValuesChange = () => {
    const value = form.getFieldsValue();
    let search:any = []
    value.searchParams.map((item:any)=>{
      if (item !==undefined) {
        search.push(item)
      }
    })
    setSearchParams(search)
    let num:any =[]
    value.users &&
    value.users.map((item: any,index:number) => {
      if(item?.name!==''||item?.title!==''){
        console.log('item',item)
        num.push({...item,dataIndex:item?.dataIndex,align:'left',editable:true}) 
      }
      })
      data.columns=[...num,data.columns[data.columns.length-1]]
      data.title = value.title;
      setTableData({...data});
  };
  return (
    // <Drawer visible={visible} onClose={onCancel} mask={false}>
    <>
      <p>表格</p>
      <Form
        name="dynamic_form_nest_item"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onValuesChange={onValuesChange}
      >
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>
        表格字段
        <Form.List name="users" initialValue={[{title:'',dataIndex:''}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    style={{ width: '100%', margin: '0', padding: '0' }}
                    {...restField}
                    name={[name, 'title']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="请输入表头" />
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%', margin: '0', padding: '0' }}
                    {...restField}
                    name={[name, 'dataIndex']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="请输入字段标识" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
         
            </>
          )}
        </Form.List>
        查询字段
        <Form.List name="searchParams" initialValue={[{name:''}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    style={{ width: '100%', margin: '0', padding: '0' }}
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="查询字段" />
                  </Form.Item>
                  <Form.Item
                    style={{ width: '100%', margin: '0', padding: '0' }}
                    {...restField}
                    name={[name, 'title']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="查询字段标题" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
         
            </>
          )}
        </Form.List>
              <Form.Item initialValue={10} label="每页大小" name="pageSize">
          <InputNumber style={{width:'100%'}}/>
        </Form.Item>
      </Form>
    </>
    // </Drawer>
  );
};

export default AddModal;
