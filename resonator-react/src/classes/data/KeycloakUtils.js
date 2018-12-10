

class FeedbackUtils {
  //given_name
  //family_name
  //name
  //email
  //user_id
  //preferred_username
  static getUserInfo(keycloak){
    return keycloak?(keycloak.idTokenParsed?keycloak.idTokenParsed:{}):{};
  }
}
export default FeedbackUtils;
