const News = require('../models/news.model');

module.exports = {
  getNews,
  insertNews,
  deleteNews,
  updateNews
}

async function getNews() {
  return await News.find()
    .sort({
      createAt: -1
    });
}

async function insertNews(news, idUser) {
  news.user = idUser;
  return await new News(news).save();
}

async function deleteNews(id) {
  return await News.findOneAndRemove({
    _id: id
  });
}


async function updateNews(news, idUser) {
  news.user = idUser;
  return await News.findOneAndUpdate({
      _id: news._id
    },
    news, {
      upsert: true
    });
}
