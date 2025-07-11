const Conversation = require("../models/messenger/conversations.model");
const ConversationMember = require("../models/messenger/conversation_members.model");
const Message = require("../models/messenger/messages.model");

exports.createConversation = async (user_id, receiver_id, item_id) => {
  const conversations = await Conversation.find({ item_id });

  for (const convo of conversations) {
    const members = await ConversationMember.find({ conversation_id: convo._id });
    const memberIds = members.map(m => m.user_id.toString());

    const hasBothUsers =
      memberIds.includes(user_id.toString()) &&
      memberIds.includes(receiver_id.toString());

    const noExtraUsers = memberIds.length === 2;

    if (hasBothUsers && noExtraUsers) {
      return convo; // ✅ Đã tồn tại
    }
  }

  // ❌ Không tìm thấy hội thoại phù hợp → tạo mới
  const newConversation = new Conversation({ item_id });
  const saved = await newConversation.save();

  await ConversationMember.insertMany([
    { conversation_id: saved._id, user_id },
    { conversation_id: saved._id, user_id: receiver_id }
  ]);

  return saved;
};


exports.getUserConversations = async (userId) => {
    const memberships = await ConversationMember.find({ user_id: userId }).populate("conversation_id");
    const result = [];

    for (const m of memberships) {
        const convo = m.conversation_id.toObject();

        const members = await ConversationMember.find({
            conversation_id: convo._id,
            user_id: { $ne: userId }
        }).populate("user_id", "name avatar");

        const lastMessage = await Message.findOne({ conversation_id: convo._id })
            .sort({ sent_at: -1 });

        result.push({
            _id: convo._id,
            productId: convo.item_id,
            updatedAt: convo.updated_at,
            receiver: members[0]?.user_id || null,
            lastMessage: lastMessage?.content || ""
        });
    }

    return result;
};

exports.sendMessage = async ({ conversation_id, sender_id, content, message_type = "text" }) => {
    const message = new Message({
        conversation_id,
        sender_id,
        content,
        message_type,
    });

    return await message.save();
};

exports.getMessagesByConversation = async (conversationId) => {
    return await Message.find({ conversation_id: conversationId })
        .sort({ sent_at: 1 })
        .populate("sender_id", "name email");
};
