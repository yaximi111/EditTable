import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, message, Form, Input, Space } from 'antd';
import SettingForm from './components/SettingForm';
import { inject, observer } from 'mobx-react';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid'
import Item from 'antd/lib/list/Item';
interface ThreeProps {
  formStores: any;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'text';
  record: any;
  index: number;
  children: React.ReactNode;
}

const Three: React.FC<ThreeProps> = ({ formStores }) => {
  // const { tableData, changeTableData } = formStores;
  const [searchParams, setSearchParams] = useState<any[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<any>({
    pagination: { current: 1, pageSize: 10 },
    dataSource: [],
    columns: [
      {
        title: '操作',
        dataIndex: 'options',
        align: 'center',
        render: (record: any, item: any, index: number) => {
          return <Button onClick={() => handleDelete(index)}>删除</Button>;
        },
      },
    ],
    title: '',
    status: false,
  });
  const [deleteKey, setDeleteKey] = useState<any>(-1);

  useEffect(() => {
    if (deleteKey > -1) {
      tableData.dataSource.splice(deleteKey, 1);
      const data = cloneDeep(tableData);
      setTableData(data);
      setDeleteKey(-1);
    }
  }, [deleteKey]);

  const isEditing = (record: any) => record.id === editingKey;

  const edit = (record: any) => {
    console.log('record',record)
    if(record){
      form.setFieldsValue({ ...record });
      setEditingKey(record.id);
    }
  };

  const cancel = () => {
    if(editingKey){
      
      save(editingKey)
    }
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as any;
      const newData = [...tableData.dataSource];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        // newData.splice(index, 1, {
        //   ...item,
        //   ...row,
        // });
        tableData.dataSource[index] ={
          ...item,...row
        }
        const data = cloneDeep(tableData);
        setTableData({...data});
        setEditingKey('');
      } else {
        tableData.dataSource.push({...row})
        const data = cloneDeep(tableData);
        setTableData(data);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const onChange = (e: any) => {
    tableData.pagination.current = e.current;
    setTableData({ ...tableData });
    cancel();
  };
  const addRow = () => {
    tableData.dataSource = [...tableData.dataSource, {id: nanoid()}];
    setTableData({ ...tableData });
  };
  const handleDelete = (index: number) => {
    setDeleteKey(index);
  };
  const addTable = () => {
    tableData.status = !tableData.status;
    setTableData({ ...tableData });
  };

  const mergedColumns = tableData.columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType:'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell: React.FC<EditableCellProps> = (props) => {
    const { editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps} = props
    return (
      <td
        {...restProps}
        onClick={(e:any)=>{e.stopPropagation();edit(record)}} 
        onBlur={()=>{
        if(editingKey!==record.id){
          cancel()
        }
        }}
      >
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return (
    <div onClick={()=>cancel()}>
    <Form form={form} component={false}>
      {tableData.status && (
        <div style={{ padding: '20px' }}>
          <Button
            onClick={() => {
              tableData.status = false;
              setTableData({ ...tableData });
            }}
          >
            del
          </Button>
          <Button onClick={() => addRow()}>添加行</Button>
          <Button
            onClick={() =>
              message.warning({
                content: (
                  <Button onClick={() => message.destroy(1)}>123123</Button>
                ),
                key: 1,
              })
            }
          >
            添加行
          </Button>
          <Row>
            <Col span={18}>
              <Row>
                <Col span={20}>
                <Space>
                  {searchParams.length !== 0&&
                    searchParams.map((item: any) => {
                      if(item.name!==undefined&&item.title!==undefined){
                        return (
                          <Form.Item style={{marginLeft:'10px'}} label={item.title} name={item.name}>
                            <Input />
                          </Form.Item>
                      );
                      }
                    })}
                </Space>
                </Col>
                
                <Col span={4}>
                  <Button type="primary" style={{ float: 'right' }}>
                    Search{' '}
                  </Button>
                </Col>
              </Row>
              <p>{tableData.title}</p>
              <Table
                rowKey={'id'}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                rowClassName="editable-row"
                onChange={onChange}
                pagination={{
                  pageSize: tableData.pagination.pageSize,
                  current: tableData.pagination.current,
                  total: tableData.dataSource.length,
                }}
                dataSource={tableData.dataSource}
                columns={mergedColumns}
                bordered
              />
            </Col>
            <Col span={6}>
              <SettingForm
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                data={tableData}
                setTableData={setTableData}
              />
            </Col>
          </Row>
        </div>
      )}
      <Button onClick={addTable}>配置表格</Button>
    </Form>
    </div>
  );
};

export default inject('formStores')(observer(Three));
