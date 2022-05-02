const Chat = require('../../models/virtual/chat-admin.model');
const Mural = require('../../models/virtual/mural.model');
const ChatWork = require('../../models/virtual/chatWork.model');

const paginate = require("jw-paginate");

module.exports = {
  getChat,
  getChatAdmin,
  insertChat,
  updateChat,
  getHeaderChat,
  getChatMural,
  insertChatMural,
  updateChatMural,
  deleteChatMural,
  getChatWork,
  insertChatWork,
  updateChatWork,
}

async function getChatAdmin(idChat) {
  return await Chat.findById(idChat);
}

async function getHeaderChat(req) {
  const pageSize = 10;
  const page = req.query.page || 1;

  let chat = await Chat
    .find()
    .select('author icReply')
    .sort({
      createdAt: -1,
      icReply: false
    })
    .skip(pageSize * page - pageSize)
    .limit(pageSize);

  const total = await Chat.count();

  const pager = paginate(total, page, pageSize);

  return {
    chat,
    pager,
  };
}

async function getChat(idChat) {
  return await Chat.findOne({ 'author.user': idChat })
}

async function insertChat(mensagem, user) {
  let chat = {};
  chat.author = {
    user: user._id,
    name: user.fullname,
    email: user.email
  };

  chat.chat = [{
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname, 
      email: user.email,
      icAdmin: user.icAdmin
    }
  }];

  return await new Chat(chat).save();
}

async function updateChat(idChat, mensagem, user) {

  const chat = {
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname,
      email: user.email,
      icAdmin: user.icAdmin
    }
  };

  return await Chat.findOneAndUpdate({
    _id: idChat
    }, {
      icReply: user.icAdmin,
      $addToSet: {
        chat: chat
      }
    }, {
      new: true
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return doc;
    });

}


//MURAL
async function getChatMural(req) {

  const dateNow = new Date();
  let date = dateNow.getDate().toString() + '/' + (dateNow.getMonth() + 1);
  const pageSize = 6;
  const page = req.query.page || 1;
  let total;

  if(date.length == 4){
    date = "0" + date;
  }

  try{
    total = await Mural.aggregate([{$match: { 'date': date}}, {$project: {chat: {$size: '$chat'}}}]);
  } catch{
    const mural = await Mural.findOne({ 'date': date });
    return {mural};
  }

  let begin = total[0] ? (total[0].chat - 1) - pageSize : 0;
  if (begin < 0 ) begin = 0;
  let end = total[0] ? total[0].chat : 1;
  if (end == 0 ) end = 1;
  const mural = await Mural.findOne({ 'date': date }, {'chat':{$slice:[begin, end]}});

  const pager = await paginate(total, page, pageSize);

  return {
    mural,
    pager,
  };

}

async function insertChatMural(mensagem, user) {
  let chat = {};
  chat.author = {
    user: user._id,
    name: user.fullname,
    email: user.email
  };

  chat.chat = [{
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname, 
      email: user.email,
      icAdmin: user.icAdmin
    }
  }];

  return await new Chat(chat).save();
}

async function updateChatMural(idChat, mensagem, user, res) {

  const chat = {
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname,
      email: user.email,
      icAdmin: user.icAdmin
    }
  };

  await Mural.findOneAndUpdate({
    _id: idChat
    }, {
      icReply: user.icAdmin,
      $addToSet: {
        chat: chat
      }
    });
  
  return await "ok";

}


async function deleteChatMural(req, res) {

  let canDelete = false;

  if(req.user.icAdmin) {
    canDelete = true;
  } else {
    let muralFind = await Mural.find({"chat._id": req.query.idChat},{ "chat.$": 1 });
    if(muralFind[0].chat && req.user.email == muralFind[0].chat[0].publisher.email){
      canDelete = true;
    }

  }

  if(canDelete) {
    await Mural.findOneAndUpdate(
      {
        _id: req.query.id,
      },
      {
        $pull: {
          chat: {
            _id: req.query.idChat
          },
        },
      },
      function (err, doc) {
        if (err) return res.send(500, {
          error: err
        });
        return doc;
      }
    );
    return await "ok";
  } else {
    return res.send(401);
  }

}


//WORK
async function getChatWork(idChat) {
  return await ChatWork.findOne({ 'idWork': idChat })
}

async function insertChatWork(idWork, mensagem, user) {

  let chatExist = await ChatWork.findOne({ 'idWork': idWork }).select("_id");

  if(chatExist){

    return updateChatWork(chatExist._id, mensagem, user);

  } else {
    let chat = {};

    chat.idWork = idWork;
   
    chat.chat = [{
      content: mensagem,
      publisher: {
        user: user._id,
        name: user.fullname, 
        email: user.email,
        icAdmin: user.icAdmin
      }
    }];
  
    return await new ChatWork(chat).save();
  }


}

async function updateChatWork(idChat, mensagem, user) {

  const chat = {
    content: mensagem,
    publisher: {
      user: user._id,
      name: user.fullname,
      email: user.email,
      icAdmin: user.icAdmin
    }
  };

  return await ChatWork.findOneAndUpdate({
    _id: idChat
    }, {
      icReply: user.icAdmin,
      $addToSet: {
        chat: chat
      }
    }, {
      new: true
    },
    function (err, doc) {
      if (err) return res.send(500, {
        error: err
      });
      return doc;
    });

}

