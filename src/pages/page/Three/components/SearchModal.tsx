import React from 'react'
import { Modal, Table, Button, Row, Col,Divider,Form,Input } from 'antd';
interface SearchModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
}

const SearchModal:React.FC<SearchModalProps> = () => {

    const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ];
  return (
    <Modal >
        <Table dataSource={dataSource} columns={columns}/>
    </Modal>
  )
}

export default SearchModal