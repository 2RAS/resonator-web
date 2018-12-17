
export default class Output{
  constructor(id){
    this.id  = id;
    this.type = 'output';
    this.inputs = ['default'];
    this.outputs = [];
  }
  changeGain(value){
    this.value = value;
  }
  export(){
    let res = {};
    res.type = 'output';
    res.id = this.id;
    return res;
  }
}
