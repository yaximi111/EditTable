import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import {
    transformToSchema,
    transformToTreeNode,
  } from '@designable/formily-transformer'
import {
  FormProvider,
  FormConsumer,
  Field,
  useField,
  observer,
} from '@formily/react'
import { Input, Form, Button } from 'antd'

// FormItem UI组件
const FormItem = observer(({ children }) => {
  const field = useField()
  return (
    <>
    <Button onClick={()=>{console.log(transformToSchema(field))}}>log</Button>
    <Form.Item
      label={field.title}
      help={field.selfErrors?.length ? field.selfErrors : undefined}
      extra={field.description}
      validateStatus={field.validateStatus}
    >
      {children}
    </Form.Item>
    </>
  )
})

export default () => {
  const form = useMemo(() => createForm({ validateFirst: true }))
  return (
    <FormProvider form={form}>
      <Form layout="vertical">
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, { placeholder: 'Please Input' }]}
        />
        <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
        <Button
          type="primary"
          onClick={() => {
            form.submit(console.log)
          }}
        >
          Submit
        </Button>
      </Form>
    </FormProvider>
  )
}