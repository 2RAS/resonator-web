import Config from 'config/api.json'
import request from 'superagent'

class FeedbackAPI{
    static getForUser(user, role, num) {
      return  request
            .get('http://' + Config.feedbackapi.uri + '/' + Config.feedbackapi.endPoints.getForUser)
            .query({user:user,role:role,num:num})
            .on('error', err => {
                console.log('getting feedback for user encountered error');
            })
            .then((res) => {
              console.log('got JSON advert: ' + JSON.stringify(res.body));
              return res.body;
            })
    };
    static getForAdvert(advertId, num) {
      return  request
            .get('http://' + Config.feedbackapi.uri + '/' + Config.feedbackapi.endPoints.getForAdvert)
            .query({advert_id:advertId,num:num})
            .on('error', err => {
                console.log('getting feedback for advert encounteree error');
            })
            .then((res) => {
              console.log('got Feedbacks for advert: ' + JSON.stringify(res.body));
              return res.body;
            })
    };
    static post(mark,comment,datetime,userAbout,userAboutRole,advert,token) {

      return  request
            .post('http://' + Config.feedbackapi.uri + '/' + Config.feedbackapi.endPoints.post)
            .set('Authorization', 'Bearer '+token)
            .query({mark:mark,comment:comment,datetime:datetime})
            .query({userAbout:userAbout, userAboutRole:userAboutRole})
            .query({advert})
            .on('error', err => {
                console.log('posting an advert encountered error');
            })
            .then((res) => {
              console.log('posted feedback!: ' + JSON.stringify(res.body));
              return res.body;
            })
    };

}


export default FeedbackAPI;
