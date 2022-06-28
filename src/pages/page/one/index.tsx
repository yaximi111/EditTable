import { Form, Input, InputNumber, Popconfirm, Table, Typography,Button } from 'antd';
import React, { Children, useState } from 'react';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType:'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}



const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex ,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell: React.FC<EditableCellProps> = (
    props
  ) => {
    const { editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps} = props
    return (
      <td {...restProps}  
        onClick={(e:any)=>{console.log('e',e) ;e.stopPropagation();edit(record)}} 
        onBlur={()=>{
        if(editingKey!==record.key){
          save(record.key)
          cancel()
        }
        }}>
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
    <Form form={form} component={false} >
      <Table onClick={()=>console.log('click')}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        onRow={(record)=>{
          return{
            onClick:()=>{
              console.log('record',record)
            }
          }
        }}
        rowClassName="editable-row"
        bordered
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </div>
  );
};

export default App;