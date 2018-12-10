

//external dependenciess
import React from 'react'
import qs from 'qs'
//internal dependencies
import './styles.css'
import 'styles/positioning.css'
// test data
import ChatComponent from 'containers/chat/ChatComponent'

class ChatPage extends React.Component{

   constructor(props){
     super(props);
     let link = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
     this.state={
       chatId:link.chatid
     };
   }
   getLastMessages(messageNum){

   }
   handleSendMessage(searchParams){

   }
   handleReceiveMessage(searchParams){

   }
   render(){
    return (
    <div className='overflowXHidden'>
      <h1 style={{margin:'0 auto', padding:'30px', display:'block', width:'10em'}}>Chat id: {this.state.chatId}</h1>
      <div style={{postion:'absolute',margin:'0 auto', padding:'30px', height:'60vh',width:'60vw', maxWidth:'800px'}}>
        <ChatComponent chatId={this.state.chatId}/>
      </div>

    </div>);
  }
};
export default ChatPage;
