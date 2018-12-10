import Config from 'config/api.json'
import request from 'superagent'

class ChatAPI {
    static createStartURL(fnPath) {
        return 'http://' + Config.chatapi.uri + '/' + fnPath;
    }

    /*          UPDATE          */

    static getAllUnreadMessages(userId, token) {
      return  request
            .get(ChatAPI.createStartURL(Config.chatapi.endPoints.getAllUnreadMessages) + '/' + userId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
              console.log('got JSON advert: ' + JSON.stringify(res.body));
              return res.body;
            })
    };

    static getAllUserConversations(userId, token) {
        request
            .get(ChatAPI.createStartURL(Config.chatapi.endPoints.getAllUserConversations) + '/' + userId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    static getAllUserConversationMessages(userId, chatId, token) {
        request
            .get(ChatAPI.createStartURL(Config.chatapi.endPoints.getAllUserConversationMessages) + '/' + userId + '/' + chatId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    /*          ADMIN           */

    static addChat(name, token) {
        request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.addChat) + '/' + name + '/' + -1 + '/' + '')
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    static setDialog(firstId, secondId, token) {
        request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.setDialog) + '/' + firstId + '/' + secondId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    static addChatUser(chatId, userId, token) {
        request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.addChatUser) + '/' + chatId + '/' + userId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    static removeChatUser(chatId, userId, token) {
        request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.removeChatUser) + '/' + chatId + '/' + userId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    static deleteChat(chatId, token) {
        request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.deleteChat) + '/' + chatId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                alert('got JSON advert: ' + JSON.stringify(res.body));
            })
    };

    /*          CHAT            */

    // TODO: add and use Message struct
    static addMessage(smth, token) {
        return  request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.addMessage) + '/' + smth)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                console.log('got JSON advert: ' + JSON.stringify(res.body));
                return res.body;
            })
    };

    static getChatById(chatId, token) {
        return  request
            .get(ChatAPI.createStartURL(Config.chatapi.endPoints.getChatById) + '/' + chatId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                console.log('got JSON advert: ' + JSON.stringify(res.body));
                return res.body;
            })
    };

    static getMessageById(id, token) {
        return  request
            .get(ChatAPI.createStartURL(Config.chatapi.endPoints.getMessageById) + '/' + id)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                console.log('got JSON advert: ' + JSON.stringify(res.body));
                return res.body;
            })
    };

    static setMessagesAsReaded(receiverId, authorId, chatId, lastId, token) {
        return  request
            .put(ChatAPI.createStartURL(Config.chatapi.endPoints.setMessagesAsReaded)
                + '/' + receiverId + '/' + authorId + '/' + chatId + '/' + lastId)
            .set('Authorization', 'Bearer '+token)
            .set('Content-Type', 'application/json')
            .on('error', err => {
                alert('error');
            })
            .then((res) => {
                console.log('got JSON advert: ' + JSON.stringify(res.body));
                return res.body;
            })
    };
}

export default ChatAPI;
