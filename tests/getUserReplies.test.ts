import { PublicThreadsApi } from "../src/PublicThreadsApi";

let api: PublicThreadsApi;
beforeEach(async () => {
  jest.mock("axios");
  api = new PublicThreadsApi();
});

test("get_user_replies gets the user's replies", async () => {
  // 314216 is the user id for Zuckerberg
  const testUserId = 314216;
  const replies = await api.get_user_replies(testUserId);

  expect(replies.data.mediaData.threads.length).toBeGreaterThan(0);
});
