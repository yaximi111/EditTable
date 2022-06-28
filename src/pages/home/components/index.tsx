import React from 'react'
import { inject, observer } from "mobx-react";
import './index.less'
import Fo from './formily'
import Mui from './FloatingActionButton'


const Index =({formStores}:any) => {
  return (
    <div>
    <Mui/>
      <button onClick={()=>console.log(localStorage.getItem('authorization'))}>logAuthorization</button>
    <button onClick={()=>formStores.changeMsg()}>formStores</button>
    <h1>{formStores.msg.name}</h1>
    <h1>{formStores.msg.age}</h1>
    <h1>{formStores.msg.number}</h1>
    </div>
  )
}

export default inject("formStores")(observer(Index));