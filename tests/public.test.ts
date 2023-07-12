import { PublicThreadsApi } from "../src/PublicThreadsApi";

let api: PublicThreadsApi;
beforeEach(async () => {
  jest.mock("axios");
  api = new PublicThreadsApi();
  await api.initialize();
});

test("getuserid retrieves user id", async () => {
  const testUserName = "zuck";
  const userID = await api.getUserId(testUserName);

  // Zuckerberg's user ID is 314216
  expect(userID).toEqual(314216);
});
