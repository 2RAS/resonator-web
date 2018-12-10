


class SearchUtils {
  static toSearchParams(someClass){
    if(!someClass)someClass = {};
    let converted =
     {
       query:someClass.query?someClass.query:'',
       category:someClass.category?someClass.category:[],
       location:someClass.location,
       fullText:someClass.fullText?true:false,
       minPrice:{
         price:someClass.minPrice?Number(someClass.minPrice.price):undefined,
         period:someClass.minPrice?(someClass.minPrice.period?someClass.minPrice.period:'day'):'day',
         currency:someClass.minPrice?(someClass.minPrice.currency?someClass.minPrice.currency:'acp'):'acp',
       },
       maxPrice:{
         price:someClass.maxPrice?Number(someClass.maxPrice.price):undefined,
         period:someClass.maxPrice?(someClass.maxPrice.period?someClass.maxPrice.period:'day'):'day',
         currency:someClass.maxPrice?(someClass.maxPrice.currency?someClass.maxPrice.currency:'acp'):'acp',
       },
       minDuration:{
         weeks:someClass.minDuration?Number(someClass.minDuration.weeks):undefined,
         days:someClass.minDuration?Number(someClass.minDuration.days):undefined,
         hours:someClass.minDuration?Number(someClass.minDuration.hours):undefined,
       }
    };
    return converted;
  }
  static toUserSearchParams(someClass){
    return {query:someClass.query};
  }
  static getHoursDuration(someClass){
    if((!someClass)||(!someClass.minDuration))return undefined;
    let timePeriod = someClass.minDuration;
    return (timePeriod.weeks ? timePeriod.weeks*7*24 :0) +
           (timePeriod.days ? timePeriod.days*24 : 0)     +
           (timePeriod.hours ? timePeriod.hours : 0)       ;
  }
  static getMinPricePerDay(someClass){
    if((!someClass)||(!someClass.minDuration))return undefined;
    let timePeriod = someClass.minDuration;
    return (timePeriod.weeks ? timePeriod.weeks*7*24 :0) +
           (timePeriod.days ? timePeriod.days*24 : 0)     +
           (timePeriod.hours ? timePeriod.hours : 0)       ;
  }
  static categoryToString(category){
    return category.join('/');
  }
  static priceToACP_Day(rentPrice){
    if(!rentPrice)return undefined;
    let res = rentPrice.price;
    if(rentPrice.period ==='week')res/=7;
    else if(rentPrice.period ==='hour')res*=24;

    if(rentPrice.currency ==='usd') res /=(28*8.75);
    else if(rentPrice.currency ==='uah') res /=8.75;
    else if(rentPrice.currency ==='rub') res /=(3*8.75)
    return res;

  }

}
export default SearchUtils;
