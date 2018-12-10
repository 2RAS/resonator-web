

import Skaters from 'test/media/images/skaters.jpeg';
import Bike from 'test/media/images/bike.jpeg';
import Hat from 'test/media/images/hat.jpeg';
import Dog from 'test/media/images/dog.jpeg'


var adverts  = [
  {
    name:'Skaters 2000',
    description:"new skaters, sharp blades",
    price: 100,
    timePeriod:'d',
    picture: Skaters,
  }, {
    name:'Nice hat',
    category:'cloth',
    subcategory:'hats',
    size:'29',
    description:"Comfy hat, make sure it's your size!",
    price: 100,
    timePeriod:'d',
    picture: Hat,
  } ,{
    name:'Big dog',
    description:"Do not feed with bisquits",
    price: 100,
    timePeriod:'d',
    picture: Dog,
  },{
    name:'Durable bike',
    description:"Just undergone a capital repair. ",
    price: 100,
    timePeriod:'d',
    picture: Bike,
  }
]


export{
  adverts
} ;
