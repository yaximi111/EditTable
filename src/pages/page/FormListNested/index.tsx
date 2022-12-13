import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

const Test: React.FC<any> = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };
  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.List
        name="sights"
        initialValue={[
          {
            test: [
              {
                price: '',
                name: '',
              },
              {
                price: '',
                name: '',
              },
            ],
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.List
                  {...field}
                  label="父"
                  name={[field.name, 'test']}
                  fieldKey={[field.key, 'test']}
                  initialValue={[
                    {
                      price: '',
                    },
                    {
                      name: '',
                    },
                  ]}
                >
                  {(testList, { add: addtest, remove: removetest }) => (
                    <>
                      {testList.map((testItem: any) => {
                        console.log(testItem);
                        return (
                          <Space key={testItem.key} align="baseline">
                            <Form.Item
                              {...testItem}
                              label="Price"
                              name={[testItem.name, 'price']}
                              fieldKey={[testItem.key, 'price']}
                              rules={[
                                { required: true, message: 'Missing price' },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...testItem}
                              label="Name"
                              name={[testItem.name, 'name']}
                              fieldKey={[testItem.key, 'name']}
                              rules={[
                                { required: true, message: 'Missing name' },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => removetest(testItem.name)}
                            />
                          </Space>
                        );
                      })}

                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => addtest()}
                          block
                          icon={<PlusOutlined />}
                        >
                          填加子
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                添加外层
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Test;
