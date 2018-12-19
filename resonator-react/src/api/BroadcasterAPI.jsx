import Config from 'config/api.json'
import request from 'superagent'

class BroadcasterAPI {
    static createStartURL(fnPath) {
        return 'http://' + Config.BroadcasterAPI.uri + '/' + fnPath;
    }

    /*          UPDATE          */

    static getAllUnreadMessages(userId, token) {
      return  request
            .get(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.getAllUnreadMessages) + '/' + userId)
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
            .get(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.getAllUserConversations) + '/' + userId)
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
            .get(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.getAllUserConversationMessages) + '/' + userId + '/' + chatId)
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.addChat) + '/' + name + '/' + -1 + '/' + '')
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.setDialog) + '/' + firstId + '/' + secondId)
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.addChatUser) + '/' + chatId + '/' + userId)
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.removeChatUser) + '/' + chatId + '/' + userId)
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.deleteChat) + '/' + chatId)
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.addMessage) + '/' + smth)
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
            .get(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.getChatById) + '/' + chatId)
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
            .get(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.getMessageById) + '/' + id)
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
            .put(BroadcasterAPI.createStartURL(Config.BroadcasterAPI.endPoints.setMessagesAsReaded)
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

export default BroadcasterAPI;
