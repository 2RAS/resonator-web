
export default class Gain{
  constructor(id,gain){
    this.id  = id;
    this.value = gain;
    this.type = 'gain';
    this.inputs = ['default'];
    this.outputs = ['default'];
  }
  changeGain(value){
    this.value = value;
  }
  export(){
    let res = {};
    res.type = 'gain';
    res.id = this.id;
    res.value = this.value;
    return res;
  }
}
