const {
  members: membersWS,
  movies: moviesWS,
  subscriptions: subscriptionsWS,
} = require("../models/subscriptions-ws");

const getMember = (id) => membersWS.get(id);

const getAllMembers = async () => {
  const members = await membersWS.get();
  const movies = await moviesWS.get();

  return members.map((member) => {
    const unwatchedMovies = movies
      .filter(
        (movie) =>
          !movie?.subscriptions?.find(({ memberID }) => memberID === member._id)
      )
      .map(({ _id, name }) => {
        return { _id, name };
      });

    return {
      ...member,
      unwatchedMovies,
      subscriptionID: member.subscriptions._id,
    };
  });
};

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
