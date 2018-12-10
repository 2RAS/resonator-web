

//external dependenciess
import React from 'react'
import qs from 'qs'
//internal dependencies
import './styles.css'
import 'styles/positioning.css'
// test data
import ChatList from 'containers/chat/ChatList'

class ChatPage extends React.Component{
   constructor(props){
     super(props);
     let link = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
     this.state={
       chats:[
         {
           avatar: 'https://facebook.github.io/react/img/logo.svg',
           alt: 'Reactjs',
           title: 'Facebook',
           subtitle: 'What are you doing?',
           date: new Date(),
           unread: 0,
           id:'someId'
         },
         {
           avatar: 'https://facebook.github.io/react/img/logo.svg',
           alt: 'usver',
           title: 'Buyer',
           subtitle: 'here is my last message',
           date: new Date(),
           unread: 1,
           id:'otherId'


         },
       ],
     };
     this.getLastMessages(20);
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
      <div style={{ margin:'0 auto',height:'60vh',padding:'40px', marginTop:'40px',width:'40vw',border:'1px solid black'}}>
        <ChatList chats ={this.state.chats} history={this.props.history}/>
      </div>

    </div>);
  }
};
export default ChatPage;
