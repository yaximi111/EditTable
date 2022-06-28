import React from 'react'
import{ Modal  } from 'antd'
interface ModalProps{
    visible:boolean,
    onOk:(e:any)=>void,
    onCancel:()=>void,
    title:string,
}

const FormModal:React.FC<ModalProps> =  ({visible,onCancel,onOk,title}) => {
  return (
    <Modal visible={visible} >FormModal</Modal>
  )
}

export default FormModal