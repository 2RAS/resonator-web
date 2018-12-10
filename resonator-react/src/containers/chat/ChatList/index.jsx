import React from 'react'
import 'react-chat-elements/dist/main.css';
import { ChatList} from 'react-chat-elements'
import qs from 'qs'
//https://devarchy.com/react/library/react-chat-elements
class CustomChatList extends React.Component{
  constructor(props){
    super(props);
    this.inputRef=React.createRef();
    this.state={

    }
  }
  handleInputChange(evt){
    this.setState({
      inputValue:evt.target.value
    })

  }
  handleInputKeyPress(evt){
    if(evt.key==='Enter'){
      this.state.messages.push({
        position:'right',
        type: 'text',
        text:evt.target.value,
        date:new Date(),
      });
      this.setState({
        inputValue:''
      });
    }
  }
  handleChooseChat(chat){

    let params=qs.stringify({chatid:chat.id})
       this.props.history.push({
         pathname: '/chat',
         search: params,
         state: {},
       });
  }
  render(){
    let content = <div>
        <ChatList
          className='chat-list'
          dataSource={this.props.chats}
          onClick={this.handleChooseChat.bind(this)} />
        </div>
    return content;
      //this.refs.input.clear();
  }
}
export default CustomChatList;
