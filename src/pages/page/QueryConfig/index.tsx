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
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { Button } from 'antd';
import styles from './index.less';

const FormItem = (props: any) => <Item className={styles.Item} {...props} />;
const Title = (props: any) => <h3>{props.text}</h3>;
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
  },
});

const form = createForm();

export default () => {
  return (
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
                  name="array"
                  // title="查询条件"
                  x-decorator="FormItem"
                  x-component="ArrayItems"
                  x-decorator-props={{
                    style: { margin: 0, padding: 0 },
                  }}
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
                        title="输入框"
                        name="name"
                        x-component="Input"
                      />
                      <SchemaField.String
                        x-decorator="FormItem"
                        required
                        title="输入框"
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
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveDown"
                        x-component-props={{ title: '下移' }}
                      />
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveUp"
                        x-component-props={{ title: '下移' }}
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
                        title="输入框"
                        name="name"
                        x-component="Input"
                      />
                      <SchemaField.String
                        x-decorator="FormItem"
                        required
                        title="输入框"
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
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveDown"
                        x-component-props={{ title: '下移' }}
                      />
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveUp"
                        x-component-props={{ title: '下移' }}
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
                        title="输入框"
                        name="name"
                        x-component="Input"
                      />
                      <SchemaField.String
                        x-decorator="FormItem"
                        required
                        title="输入框"
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
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveDown"
                        x-component-props={{ title: '下移' }}
                      />
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveUp"
                        x-component-props={{ title: '下移' }}
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
                <SchemaField.String
                  x-decorator="FormItem"
                  // title="文本预览"
                  name="resolvePathLabel"
                  x-component="PreviewText.Input"
                  default={'解析路径'}
                />
                <SchemaField.String
                  name="resolvePath"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  x-decorator="FormItem"
                  // title="文本预览"
                  name="rowKeyLabel"
                  x-component="PreviewText.Input"
                  default={'rowKey'}
                />
                <SchemaField.String
                  name="rowKey"
                  x-decorator="FormItem"
                  x-component="Input"
                />
                <SchemaField.String
                  x-decorator="FormItem"
                  // title="文本预览"
                  name="relevancyResolvePathLabel"
                  x-component="PreviewText.Input"
                  default={'关联解析字段'}
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
                        title="输入框"
                        name="name"
                        x-component="Input"
                      />
                      <SchemaField.String
                        x-decorator="FormItem"
                        required
                        title="输入框"
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
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveDown"
                        x-component-props={{ title: '下移' }}
                      />
                      <SchemaField.Void
                        x-decorator="FormItem"
                        x-component="ArrayItems.MoveUp"
                        x-component-props={{ title: '下移' }}
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
            initialValues: {
              aaa: '123',
            },
          })
          .then(console.log);
      }}
    >
      配置查询
    </Button>
  );
};
