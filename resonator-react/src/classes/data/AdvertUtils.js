
class AdvertUtils {
  static toAdvert(someClass){
    //to be implemented
    return undefined;
  }
  static horribleUserToAdvertConvert(user, additionalUser){
    if(additionalUser!=undefined)
      user={...user,...additionalUser};
    let frank = {
      id:user.id,
      name: user.firstName +' '+ user.lastName,
      category: 'user',
      info: user.email,
      photo: user.photo,
    }
    return frank;
  }
  static restructureSimpleCategories(categories){
    var res =[];
     for(let category of categories){
       res.push({
         id:category.category,
         message:category.category,
       });
       res[res.length-1].options=[]
       for(let sub of category.subcategories){
         res[res.length-1].options.push({
           id:sub,
           message:sub,
           options:[],
         })
       }
     }
     return res;
   }
}
export default AdvertUtils;
