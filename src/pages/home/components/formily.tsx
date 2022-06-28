import React from 'react'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import {data} from '../../stores/formily'
import { PrimaryButton } from '@fluentui/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


// const obs = observable({
//   value: 'Hello world',
// })
const Fo = observer(() => {
  const changeMsg = (newData:any) => {
    data.name = newData.name
    data.age = newData.age
    data.number = newData.number
  }
  return (
    <div >
      <button onClick={()=>changeMsg({name:'张宇亮',age:100,number:10086})}>changeMsg</button>
      {data.age}
      {data.name}
      {data.number}
      <PrimaryButton  onClick={()=>changeMsg({name:'李亮',age:20,number:10001})}>Fluentui</PrimaryButton>
      <Stack spacing={2} direction="row">
      <Button variant="text">MUI</Button>
      <Button variant="contained">MUI</Button>
      <Button variant="outlined">MUI</Button>
    </Stack>
    </div>
  )
})
// export default observer(() => {
//   return (
//     <div>
//       <div>
//         <input
//           style={{
//             height: 28,
//             padding: '0 8px',
//             border: '2px solid #888',
//             borderRadius: 3,
//           }}
//           value={obs.value}
//           onChange={(e) => {
//             obs.value = e.target.value
//           }}
//         />
//       </div>
//       <div>{obs.value}</div>
//     </div>
//   )
// })
export default Fo