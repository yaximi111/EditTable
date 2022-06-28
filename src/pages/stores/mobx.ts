import { action, makeObservable, observable } from 'mobx';

class formStores {
  msg: any = {
    name: 'jom',
    age: 18,
    number: 110,
  };
  tableData:any=[]
  constructor() {
    makeObservable(this, {
      msg: observable,
      tableData:observable,
      changeMsg: action.bound,
      changeTableData:action.bound,
    });
  }
  changeMsg() {
    this.msg.name = 'tom';
    this.msg.age = 28;
    this.msg.number = 120;
  }
  changeTableData (newData:any){
    this.tableData =newData
  }
}

export default new formStores();
