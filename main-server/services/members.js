const {
  members: membersWS,
  subscriptions: subscriptionsWS,
} = require("../models/subscriptions-ws");

const getMember = (id) => membersWS.get(id);

const getAllMembers = () => membersWS.get();

function createMember(member) {
  // member.genres = member.genres.split(/[ ,]+/);

  return membersWS.post(member);
}

function updateMember(id, member) {
  // member.genres = member.genres.split(/[ ,]+/);

  return membersWS.put(id, member);
}

const deleteMember = async (memberID) => {
  const subscriptionID = (await subscriptionsWS.get()).find(
    (subscription) => memberID === subscription.memberID.toString()
  )?._id;

  await membersWS.delete(memberID);
  if (subscriptionID) await subscriptionsWS.delete(subscriptionID);
};

module.exports = {
  get: getMember,
  getAll: getAllMembers,

  create: createMember,
  update: updateMember,

  delete: deleteMember,
};
