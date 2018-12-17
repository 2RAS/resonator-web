


export default class Source{
  constructor(id,url){
    this.id  = id;
    this.value = url;
    this.type = 'source';
    this.inputs = [];
    this.outputs = ['default'];
  }
  changeSource(value){
    this.value = value;
  }

  export(){
    let res = {};
    res.type = 'loader';
    res.id = this.id;
    res.value = this.value;
    return res;
  }


}
