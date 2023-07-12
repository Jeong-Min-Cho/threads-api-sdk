import { PublicThreadsApi } from "../src/PublicThreadsApi";

let api: PublicThreadsApi;
beforeEach(async () => {
  jest.mock("axios");
  api = new PublicThreadsApi();
});

test("getuserid retrieves user id", async () => {
  const testUserId = 314216;
  const user = await api.get_user(testUserId);
});
