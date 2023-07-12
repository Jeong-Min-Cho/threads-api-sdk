import { PublicThreadsApi } from "../src/PublicThreadsApi";

let api: PublicThreadsApi;
beforeEach(async () => {
  jest.mock("axios");
  api = new PublicThreadsApi();
});

test("get_user_threads", async () => {
  // 314216 is the user id for Zuckerberg
  const testUserId = 314216;
  const user = await api.get_user_threads(testUserId);
  // His very first thread - https://www.threads.net/t/CuP48CiS5sx
  const threadCode =
    user.data.mediaData.threads[user.data.mediaData.threads.length - 1]
      .thread_items[
      user.data.mediaData.threads[user.data.mediaData.threads.length - 1]
        .thread_items.length - 1
    ].post.code;

  expect(threadCode).toEqual("CuP48CiS5sx");
}, 10000);
