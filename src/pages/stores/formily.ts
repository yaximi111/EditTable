import { observable } from '@formily/reactive'

export const data = observable({
    name: 'jom',
    age: 18,
    number: 110,
})

export const changeMsg = (newData:any) => {
    data.name = newData.name
    data.age = newData.age
    data.number = newData.number
  }
