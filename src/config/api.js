const domain = "quiz-app-api.eastus.azurecontainer.io:3000";
const v1 = "/api/v1";

export const API = {
  DOMAIN: domain + v1,
  QUIZ: domain + v1 + "/quize",
  ARTICLE: domain + v1 + "/quize/article-choice",
  CHECK_ALL_YEAR: domain + v1 + "/checkAllyearInUniversity",
  CHECK_FACULTY_YEAR: domain + v1 + "/checkfaculty-year",
  CHECK_ALL_AMOUNT: domain + v1 + "/checkAllAmount-AllUniversity",
  CHECK_END_AMOUNT: domain + v1 + "/checkEndAmount-Year",
};
