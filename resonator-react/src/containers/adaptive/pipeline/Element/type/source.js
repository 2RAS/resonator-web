


export default class Source{
  constructor(id,config){
    this.id  = id;
    this.config={
      url: config.url
    }
    this.type = 'source';
    this.inputs = [];
    this.outputs = ['default'];
  }
  changeSource(url){
    this.config.url = url;
  }

  export(){
    let res = {};
    res.type = 'loader';
    res.id = this.id;
    res.value = this.value;
    return res;
  }


}
