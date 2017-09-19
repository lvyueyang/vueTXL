import AV from 'leancloud-storage'

const APP_ID = 'UHRBuOgJqVohTI6qIRWJLLzT-gzGzoHsz';
const APP_KEY = 'z5kEN5pelm5qCKtbClCP2tW4';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

let api = {
  getlist() {
    let query = new AV.Query('list');
    return new Promise((resolve, reject) => {
      query.find().then((products) => {
        let list = [];
        for (let i in products) {
          products[i]._serverData.id = products[i].id;
          list.push(products[i]._serverData)
        }
        resolve(list);
      });
    })
  },
  getdetail(id) {
    let query = new AV.Query('list');
    return new Promise((resolve, reject) => {
      query.get(id).then((todo) => {
        todo._serverData.id = todo.id;
        resolve(todo);
      });
    });
  },
  add(info) {
    let AddList = AV.Object.extend('list');
    let addList = new AddList();
    return new Promise((resolve, reject) => {
      addList.set('username', info.username);
      addList.set('sex', info.sex);
      addList.set('birthday', info.birthday);
      addList.set('money', info.money);
      addList.set('phone', info.phone);
      addList.set('area', info.area);
      addList.set('city', info.city);
      addList.set('address', info.address);
      addList.set('img', info.img);
      addList.save().then((todo) => {
        resolve(todo);
      });
    });
  },
  edit(id, info) {
    return new Promise((resolve, reject) => {
      let list = AV.Object.createWithoutData('list', id);
      list.set('username', info.username);
      list.set('sex', info.sex);
      list.set('birthday', info.birthday);
      list.set('money', info.money);
      list.set('phone', info.phone);
      list.set('area', info.area);
      list.set('city', info.city);
      list.set('address', info.address);
      list.set('img', info.img);
      list.save().then((todo) => {
        resolve(todo);
      });
    })
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      let item = AV.Object.createWithoutData('list', id);
      item.destroy().then(function (success) {
        resolve(success);
      });
    })
  },
  imgfile(imgtext, name) {
    return new Promise((resolve, reject) => {
      let data = {base64: imgtext};
      let file = new AV.File(name, data);
      file.save().then(res => {
        resolve(res);
      });

    });
  }
};

export default api
