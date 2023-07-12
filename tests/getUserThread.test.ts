import { PublicThreadsApi } from "../src/PublicThreadsApi";

let api: PublicThreadsApi;
beforeEach(async () => {
  jest.mock("axios");
  api = new PublicThreadsApi();
});

// skip this test for now
test.skip("get_user_thread", async () => {
  // 314216 is the user id for Zuckerberg
  const testThreadID = "CuP48CiS5sx";
  const thread = await api.get_thread(3138977881796615000);
  // His very first thread - https://www.threads.net/t/CuP48CiS5sx
}, 10000);
