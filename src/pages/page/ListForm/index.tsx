import React, { useState,useEffect } from 'react';
import {
  FormItem,
  Input,
  Editable,
  FormButtonGroup,
  Submit,
  ArrayTable,
  PreviewText,
} from '@formily/antd';
import {
  FormProvider,
  createSchemaField,
  useFieldSchema,
  useField,
} from '@formily/react';
import { Button, Alert } from 'antd';
import { createForm, onFieldChange, onFieldReact } from '@formily/core';
import { Observer } from '@formily/react';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import Dialog from './components/Dialog';
import Dog from './components/Dog';
const OptionButton = (data: any) => {
  const schemas = useFieldSchema();
  return (
    <>
      <Button
        onClick={() => {
          console.log(
            'schemas',
            JSON.stringify(schemas.root.toJSON(), null, 2),
          );
        }}
      >
        log{' '}
      </Button>
    </>
  );
};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    Input,
    ArrayTable,
    PreviewText,
    OptionButton,
  },
});

const form = createForm({
  effects: () => {
    //主动联动模式
    onFieldChange('hideFirstColumn', ['value'], (field) => {
      field.query('array.column4').take((target) => {
        target.visible = !field.value;
      });
      field.query('array.*.a2').take((target) => {
        target.visible = !field.value;
      });
    });
    //被动联动模式
    onFieldReact('array.*.a2', (field) => {
      field.visible = !field.query('.a1').get('value');
    });
  },
});

const range = (count: number) =>
  Array.from(new Array(count)).map((_, key) => ({
    name: key,
    age: `${key}` + key,
    code: `${key}` + key + key,
  }));

const schema = observable({
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        scroll: { x: '100%' },
      },
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 80, title: 'Index', align: 'center' },
            properties: {
              index: {
                type: 'void',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A1', align: 'center' },
            properties: {
              name: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'PreviewText',
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A2', align: 'center' },
            properties: {
              age: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'PreviewText',
              },
            },
          },
          column4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 200, title: 'A3', align: 'center' },
            properties: {
              code: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'PreviewText',
              },
            },
          },
          column5: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': {
              title: 'Operations',
              dataIndex: 'operations',
              width: 200,
              fixed: 'right',
              align: 'center',
            },
            properties: {
              options: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'OptionButton',
                'x-component-props': {
                  record: '{{$record}}',
                  index: '{{$index}}',
                  age: 'age',
                  value: ArrayTable.caller,
                },
              },
            },
          },
        },
      },
    },
  },
});

const ListForm = observer(() => {
  const [data, setData] = useState(schema);

  useEffect(() => {
    console.log('data',data)
  }, [data])
  

  return (
    <>
      <FormProvider form={form}>
        <SchemaField schema={data} />
        <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
          <Button
            block
            onClick={() => {
              form.setInitialValues({
                array: range(10),
              });
            }}
          >
            加载10条数据
          </Button>
          <Button
            onClick={() => {
              data.properties.array.items.properties.column5.properties.options[
                'x-component'
              ] = 'Input';
              setData({ ...data });
            }}
          >
            changeSchema
          </Button>
        </FormButtonGroup>
      </FormProvider>
      <Dog />
    </>
  );
});

export default ListForm;
