import React from 'react'
import { inject, observer } from "mobx-react";
// import './index.less'
import { observer as ob } from '@formily/reactive-react'
import { observable } from '@formily/reactive'
import Fo from './components/formily'
import Mui from './components/FloatingActionButton'
import Test from './components'
// const obs = observable({
//   value: 'Hello world',
// })

// const Index =({formStores}:any) => {
//   return (
//     <div>
//       <button onClick={()=>console.log(localStorage.getItem('authorization'))}>logAuthorization</button>
//     <button onClick={()=>formStores.changeMsg()}>changeFormStores</button>
//     <h1>{formStores.msg.name}</h1>
//     <h1>{formStores.msg.age}</h1>
//     <h1>{formStores.msg.number}</h1>
//     <button onClick={()=>{obs.value='2123'}}>changeFormStores</button>
//     <Fo/>
//     <Mui/>
//     </div>
//   )
// }

// export default inject("formStores")(observer(Index));

export default Test