import React from 'react';
import {
  FormItem as Item,
  Input,
  Editable,
  Select,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  FormDrawer,
  Space,
  PreviewText,
  Switch,
  FormDialog,
} from '@formily/antd';
import { createForm, onFieldChange, onFieldReact } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { observable, observe } from '@formily/reactive';
import { observer, Observer } from '@formily/reactive-react';
import { Button, InputNumber } from 'antd';
import styles from './index.less';
import ConfigModal from './components/ConfigModal';

const obs = observable({
  initialValues: {},
  visible: false,
  type: 'input',
  queryParams: [],
  url: '',
  body: {},
  header: [],
  relevancyResolvePath: [],
  rowKey: '',
  queryConfig: '',
  method: '',
  requestType: [],
});
export const FormItem = (props: any) => (
  <Item className={styles.Item} {...props} />
);
const Title = (props: any) => <h3>{props.text}</h3>;
const ToggleButton = (props: any) => {
  const open = () => {
    obs.visible = true;
    obs.type = props.value;
  };
  const renderButton = () => {
    switch (props.value) {
      case 'input':
        return <Input {...props} placeholder={'请输入默认值'} />;
      case 'textArea':
        return <Input.TextArea {...props} placeholder={'请输入默认值'} />;
      case 'inputNumber':
        return <InputNumber {...props} placeholder={'请输入默认值'} />;

      case 'select':
        return (
          <Button
            type="dashed"
            {...props}
            children={'配置可选项'}
            onClick={open}
          />
        );
      case 'timeFrame':
        return (
          <Button
            type="dashed"
            {...props}
            children={'配置时间'}
            onClick={open}
          />
        );
      case 'time':
        return (
          <Button
            type="dashed"
            {...props}
            children={'配置时间'}
            onClick={open}
          />
        );
      default:
        break;
    }
  };
  return <>{renderButton()}</>;
};
const SchemaField = createSchemaField({
  components: {
    FormItem,
    DatePicker,
    Editable,
    Space,
    Input,
    Select,
    ArrayItems,
    PreviewText,
    Switch,
    Title,
    ToggleButton,
    InputNumber,
  },
});

const form = createForm({
  effects: () => {
    //主动联动模式
    // onFieldChange('array.*.aa', ['value'], (field: any, form) => {
    //   form.setFieldState(field.query('.bb'), (state) => {
    //     state.visible = field.value != '123';
    //   });
    // });
    // //被动联动模式
    // onFieldReact('array.*.dd', (field) => {
    //   field.visible = field.query('.cc').get('value') != '123';
    // });
  },
});
const QueryConfig = observer(() => {
  const submit = () => {
    obs.visible = false;
  };
  const cancel = () => {
    obs.visible = false;
  };
  return (
    <>
      <Button
        onClick={() => {
          FormDrawer('抽屉表单', () => {
            return (
              <FormProvider form={form}>
                <SchemaField>
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: '查询条件' }}
                  />
                  <SchemaField.Array
                    name="queryConfig"
                    // title="查询条件"
                    x-decorator="FormItem"
                    x-component="ArrayItems"
                  >
                    <SchemaField.Object>
                      <SchemaField.Void x-component="Space">
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.SortHandle"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="name"
                          x-component="Input"
                          x-component-props={{
                            style: { maxWidth: '200px' },
                          }}
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="code"
                          x-component="Input"
                          x-component-props={{
                            style: { maxWidth: '200px' },
                          }}
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="type"
                          x-component="Select"
                          x-component-props={{ style: { width: '150px' } }}
                          enum={[
                            { label: '单行文本', value: 'input' },
                            { label: '多行文本', value: 'textArea' },
                            { label: '单行文本', value: 'inputNumber' },
                            { label: '下拉框', value: 'select' },
                            { label: '时间', value: 'time' },
                            { label: '时间范围', value: 'timeFrame' },
                          ]}
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="age"
                          x-component="ToggleButton"
                          x-component-props={{
                            style: { width: '150px' },
                          }}
                          x-reactions={{
                            dependencies: [
                              {
                                name: 'value',
                                source: '.type',
                                property: 'value',
                              },
                            ],
                            fulfill: {
                              run: `$effect(()=>{
                              console.log('value',$deps.value)
                              $self.visible=$deps.value!==undefined
                              $self.value=$deps.value
                          },[$deps.value])`,
                            },
                          }}
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Remove"
                          x-component-props={{ title: '删除' }}
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Copy"
                          x-component-props={{ title: '复制' }}
                        />
                      </SchemaField.Void>
                    </SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayItems.Addition"
                      title="添加条目"
                    />
                  </SchemaField.Array>
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: 'url' }}
                  />
                  <SchemaField.String
                    name="url"
                    x-decorator={'FormItem'}
                    x-component="Input.TextArea"
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: 'method' }}
                  />
                  <SchemaField.String
                    name="method"
                    x-decorator={'FormItem'}
                    x-component="Select"
                    enum={[
                      { label: 'get', value: 'get' },
                      { abel: 'post', value: 'post' },
                    ]}
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: '查询参数' }}
                  />
                  <SchemaField.Array
                    name="queryParams"
                    x-decorator="FormItem"
                    x-component="ArrayItems"
                  >
                    <SchemaField.Object>
                      <SchemaField.Void x-component="Space">
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.SortHandle"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="name"
                          x-component="Input"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="code"
                          x-component="Input"
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Remove"
                          x-component-props={{ title: '删除' }}
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Copy"
                          x-component-props={{ title: '复制' }}
                        />
                      </SchemaField.Void>
                    </SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayItems.Addition"
                      title="添加条目"
                    />
                  </SchemaField.Array>
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: 'header' }}
                  />
                  <SchemaField.Array
                    name="header"
                    x-decorator="FormItem"
                    x-component="ArrayItems"
                  >
                    <SchemaField.Object>
                      <SchemaField.Void x-component="Space">
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.SortHandle"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="name"
                          x-component="Input"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="code"
                          x-component="Input"
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Remove"
                          x-component-props={{ title: '删除' }}
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Copy"
                          x-component-props={{ title: '复制' }}
                        />
                      </SchemaField.Void>
                    </SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayItems.Addition"
                      title="添加条目"
                    />
                  </SchemaField.Array>
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: 'requestType' }}
                  />
                  <SchemaField.String
                    name="requestType"
                    x-decorator={'FormItem'}
                    x-component="Select"
                    enum={[
                      { label: 'json', value: 'json' },
                      { abel: 'form', value: 'form' },
                    ]}
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: 'body' }}
                  />
                  <SchemaField.String
                    name="body"
                    x-decorator={'FormItem'}
                    x-component="Input.TextArea"
                    x-component-props={{ defaultValue: '{}' }}
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: '是否分页' }}
                  />
                  <SchemaField.Boolean
                    name="pagination"
                    x-decorator="FormItem"
                    x-component="Switch"
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: '解析路径' }}
                  />
                  <SchemaField.String
                    name="resolvePath"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: 'rowKey' }}
                  />
                  <SchemaField.String
                    name="rowKey"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemaField.Void
                    x-component="Title"
                    x-component-props={{ text: '关联解析字段' }}
                  />
                  <SchemaField.Array
                    name="relevancyResolvePath"
                    x-decorator="FormItem"
                    x-component="ArrayItems"
                  >
                    <SchemaField.Object>
                      <SchemaField.Void x-component="Space">
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.SortHandle"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="name"
                          x-component="Input"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="code"
                          x-component="Input"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="age"
                          x-component="Input"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="title"
                          x-component="Input"
                        />
                        <SchemaField.String
                          x-decorator="FormItem"
                          required
                          name="job"
                          x-component="Input"
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Remove"
                          x-component-props={{ title: '删除' }}
                        />
                        <SchemaField.Void
                          x-decorator="FormItem"
                          x-component="ArrayItems.Copy"
                          x-component-props={{ title: '复制' }}
                        />
                      </SchemaField.Void>
                    </SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayItems.Addition"
                      title="添加条目"
                    />
                  </SchemaField.Array>
                </SchemaField>
                <FormButtonGroup>
                  <Button onClick={() => console.log('配置查询表格')}>
                    提交
                  </Button>
                  <Submit onSubmit={console.log}>提交</Submit>
                </FormButtonGroup>
              </FormProvider>
            );
          })
            .forOpen((props, next) => {
              setTimeout(() => {
                next();
              }, 1000);
            })
            .open({
              initialValues: {},
            })
            .then(console.log);
        }}
      >
        配置查询
      </Button>
      <ConfigModal
        type={obs.type}
        cancel={cancel}
        submit={submit}
        visible={obs.visible}
        initialValues={obs.initialValues}
      />
    </>
  );
});

export default QueryConfig;
