import Config from 'config/api.json'
import request from 'superagent'

class OrderAPI{
      static getGiveOrders(userID, ordersAmount) {
        return  request
              .get('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.getAllGiveOrders + '/' + userID)
              .query({ 'OrdersAmount': ordersAmount })
              .on('error', err => {
                  console.log('getGiveOrders encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      };

      static getRetrieveOrders(userID, ordersAmount) {
        return  request
              .get('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.getRetrieveOrders + '/' + userID)
              .query({ 'OrdersAmount': ordersAmount })
              .on('error', err => {
                  console.log('getRetrieveOrders encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      };

      static getGiveOrdersUntill(userID, mdate) {
        return  request
              .get('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.getGiveOrdersUntill + '/' + userID)
              .query({ 'Date': mdate})
              .on('error', err => {
                  console.log('getGiveOrdersUntill encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      };

      static getRetrieveOrdersUntill(userID, mdate) {
        return  request
              .get('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.getRetrieveOrdersUntill + '/' + userID)
              .query({ 'Date': mdate})
              .on('error', err => {
                  console.log('getRetrieveOrdersUntill encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      };


      static getReturnable(userGiverID){
        return  request
              .get('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.getNotReturnedOrders + '/' + userGiverID)
              .on('error', err => {
                  console.log('getReturnable encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      }

      static getPrice(itemID){
        return  request
              .get('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.getPrice + '/' + itemID)
              .on('error', err => {
                  console.log('getPrice encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      }

      /* POST */
      static updatePayment(itemID, newPayFlag){
        return  request
              .post('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.updatePayment + '/' + itemID)
              .query({'newPayFlag': newPayFlag})
              .on('error', err => {
                  console.log('updatePayment encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      }

      static createOrder(advert, mdate, mstart, mfinish, price, userWhoGet){
        return  request
        .post('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.updatePayment + '/' + advert)
        .query({'mdate': mdate})
        .query({'mstart': mstart})
        .query({'mfinish': mfinish})
        .query({'price': price})
        .query({'userWhoGet': userWhoGet})
        .on('error', err => {
            console.log('create encountered error');
        })
        .then((res) => {
          console.log('got JSON orders: ' + JSON.stringify(res.body));
          return res.body;
        })
      }

      static updateIsTransfer(id, istnew, userWhoGet){
        return  request
              .post('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.updatePayment + '/' + id)
              .query({'istnew': istnew})
              .query({'userwhoGet': userWhoGet})
              .on('error', err => {
                  console.log('update is transfer encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      }

      static updateIsReturn(id, isrnew, userWhoGive){
        return  request
              .post('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.updatePayment + '/' + id)
              .query({'isrnew': isrnew})
              .query({'userwhoGive': userWhoGive})
              .on('error', err => {
                  console.log('update is return encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      }

      static updateIsGiveAgree(id, newgiveagree, userWhoGive){
        return  request
              .post('http://' + Config.orderapi.uri + '/' + Config.orderapi.endPoints.updatePayment + '/' + id)
              .query({'newgiveagree': newgiveagree})
              .query({'userwhoGive': userWhoGive})
              .on('error', err => {
                  console.log('update is agree encountered error');
              })
              .then((res) => {
                console.log('got JSON orders: ' + JSON.stringify(res.body));
                return res.body;
              })
      }
}

export default OrderAPI;