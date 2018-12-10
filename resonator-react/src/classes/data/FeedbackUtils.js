

class FeedbackUtils {
  static toFeedback(someClass){
    if(!someClass)someClass = {};
    let converted =
     {
       mark:(someClass.mark!==undefined)?someClass.mark:0,
       authorName:someClass.authorName?someClass.authorName:'',
       dateTime:someClass.dateTime?someClass.dateTime:'',
       comment:someClass.comment,
       rentedItem: someClass.rentedItem,
       rentedFrom: someClass.rentedFrom,
       rentedTo:   someClass.rentedTo,
       likes: (someClass.likes!==undefined)?someClass.likes:0,
       isLiked:someClass.isLiked
    };
    return converted;
  }
  static getEmptyFeedback(){
    return {
        mark:0,
        authorName:'',
        dateTime:'',
        comment: '',
        rentedItem: '?',
        rentedFrom: '?',
        rentedTo:   '?',
        likes: 0,
        isLiked:false
    }
  }
  static getTestFeedbacks(){
    return [
        {
          mark:1,
          authorName:'Stan Doe',
          dateTime:'October 2th, 2018',
          comment: 'I hate this hat! I hate this hatI hate this hatI hate this hatI hate this hatI hate this hatI hate this hat',
          rentedItem: 'Hat',
          rentedFrom: '10.9.18',
          rentedTo:   '15.9.18',
          likes: 5,
          isLiked:false
        },
        {
          mark:5,
          authorName:'Super Ego',
          dateTime:'October 12th, 2018',
          comment: 'Nice hat!',
          rentedItem: 'Hat',
          rentedFrom: '1.10.18',
          rentedTo:   '10.10.18',
          likes: 3,
          isLiked:true
        },
        {
          mark:3,
          authorName:'John Sceptic',
          dateTime:'October 21th, 2018',
          comment: 'worn out',
          rentedItem: 'Hat',
          rentedFrom: '12.10.18',
          rentedTo:   '21.10.18',
          likes: 4,
          isLiked:true
        }
      ];
  }
  static convertDate(date){
    let month =new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");

    return 'Y m d'.replace('Y', date.getFullYear())
                .replace('d', date.getDate())
                .replace('m', month[date.getMonth()]);

  }
  static convertApiFeedback(stateRef, feedback){

    return FeedbackUtils.getEmptyFeedback();
  }
}
export default FeedbackUtils;
