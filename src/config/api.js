const domain = "http://quiz-app-api.eastus.azurecontainer.io:3000";
const v1 = "/api/v1";

export const API = {
  DOMAIN: domain + v1,
  QUIZ: domain + v1 + "/quize",
  LEADER_BOARD: domain + v1 + "/quize/leaderboard",
  ARTICLE: domain + v1 + "/quize/article-choice",
  PLAY: domain + v1 + "/play",
  CREATE_PLAYER: domain + v1 + "/play/create",

};
