import { PublicThreadsApi } from "../src/PublicThreadsApi";

let api: PublicThreadsApi;
beforeEach(async () => {
  jest.mock("axios");
  api = new PublicThreadsApi();
});

test("get_user gets a proper data", async () => {
  // 314216 is the user id for Zuckerberg
  const testUserId = 314216;
  const userData = await api.get_user(testUserId);

  expect(userData.full_name).toEqual("Mark Zuckerberg");
  expect(userData.username).toEqual("zuck");
});
