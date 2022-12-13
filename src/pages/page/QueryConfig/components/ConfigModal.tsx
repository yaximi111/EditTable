import React, { createContext, useContext, useEffect } from 'react';
import {
  DatePicker,
  Editable,
  Space,
  Input,
  Select,
  ArrayItems,
  PreviewText,
  Switch,
  FormLayout,
  TimePicker,
} from '@formily/antd';
import { observer, Observer } from '@formily/reactive-react';
import { createForm } from '@formily/core';
import { createSchemaField, FormProvider } from '@formily/react';
import { Button, Modal } from 'antd';
import { FormItem } from '../index';

interface DialogProps {
  visible: boolean;
  submit: (values: any) => void;
  cancel: () => void;
  initialValues: any;
  type: string;
}
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
    TimePicker,
  },
});

const Dialog: React.FC<DialogProps> = ({
  submit,
  cancel,
  visible,
  initialValues,
  type,
}) => {
  const form = createForm({
    effects: () => {},
  });
  const renderOptionConfig = () => {
    return (
      <SchemaField>
        <SchemaField.Array
          name="optionConfig"
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
      </SchemaField>
    );
  };
  const renderTimeConfig = () => {
    return (
      <SchemaField>
        <SchemaField.String
          name="time"
          title="时间"
          required
          x-decorator="FormItem"
          x-component="TimePicker"
        />
      </SchemaField>
    );
  };
  const renderTimeFrameConfig = () => {
    return (
      <SchemaField>
        <SchemaField.String
          name="[startTime,endTime]"
          title="时间范围"
          x-decorator="FormItem"
          x-component="TimePicker.RangePicker"
        />
      </SchemaField>
    );
  };
  return (
    <Modal visible={visible} onOk={submit} onCancel={cancel} title="配置可选项">
      <FormLayout labelCol={6} wrapperCol={10}>
        <FormProvider form={form}>
          {type === 'select' && renderOptionConfig()}
          {type === 'time' && renderTimeConfig()}
          {type === 'timeFrame' && renderTimeFrameConfig()}
        </FormProvider>
      </FormLayout>
    </Modal>
  );
};

export default Dialog;
