import { CommonUserData, UserCardInfo } from "~/types/global";

function commonInterestsQty(a: string[], b: string[]) {
  return a.filter((tag) => b.includes(tag)).length;
}

function findDistance(user: UserCardInfo, currUser: CommonUserData) {
  return user.distance || haversineDistance(user.location, currUser.location);
}

function sortByMostCommonInterests(
  users: UserCardInfo[],
  currUser: CommonUserData
) {
  return users.slice().sort((a, b) => {
    const commonA = commonInterestsQty(a.tags, currUser.tags);
    const commonB = commonInterestsQty(b.tags, currUser.tags);
    return commonB - commonA;
  });
}

function sortByClosest(users: UserCardInfo[], currUser: CommonUserData) {
  return users.slice().sort((a, b) => {
    a.distance = findDistance(a, currUser);
    b.distance = findDistance(b, currUser);
    return a.distance - b.distance;
  });
}

export const sortModule = {
  ["most young"]: (users: UserCardInfo[], currUser: CommonUserData) =>
    users.slice().sort((a, b) => b.dateOfBirth - a.dateOfBirth),
  ["least young"]: (users: UserCardInfo[], currUser: CommonUserData) =>
    users.slice().sort((a, b) => a.dateOfBirth - b.dateOfBirth),
  ["most close"]: (users: UserCardInfo[], currUser: CommonUserData) =>
    sortByClosest(users, currUser),
  ["most famed"]: (users: UserCardInfo[], currUser: CommonUserData) =>
    users.slice().sort((a, b) => b.fameRating - a.fameRating),
  ["more common interests"]: (
    users: UserCardInfo[],
    currUser: CommonUserData
  ) => sortByMostCommonInterests(users, currUser),
};

export const filterModule = {
  ["more than 2 common interests"]: (
    users: UserCardInfo[],
    currUser: CommonUserData
  ) => users.filter((item) => commonInterestsQty(item.tags, currUser.tags) > 2),
  ["no more than 5 years older than you"]: (
    users: UserCardInfo[],
    currUser: CommonUserData
  ) =>
    users.filter(
      (item) => getAge(item.dateOfBirth) - getAge(currUser.dateOfBirth) <= 5
    ),
  ["more than 3 fame rating"]: (users: UserCardInfo[]) =>
    users.filter((item) => item.fameRating >= 3),
  ["less than 5km distance"]: (
    users: UserCardInfo[],
    currUser: CommonUserData
  ) => users.filter((item) => findDistance(item, currUser) <= 5),
};
