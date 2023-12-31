import axios from "axios";
import { AbstractThreadsApi } from "./AbstractThreadsApi";

import { LSDTOKEN } from "./constants/LSDToken";
import { UserThreads } from "./types/Thread";
import { GetUser, User } from "./types/User";

export class PublicThreadsApi extends AbstractThreadsApi {
  THREADS_API_URL = "https://www.threads.net/api/graphql";
  threads_api_token: string;
  default_headers: any;

  constructor() {
    super();
    this.threads_api_token = LSDTOKEN;
    this._get_threads_api_token();
    this.default_headers = {
      Authority: "www.threads.net",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://www.threads.net",
      Pragma: "no-cache",
      "Sec-Fetch-Site": "same-origin",
      "X-ASBD-ID": "129477",
      "X-IG-App-ID": "238260118697367",
      "X-FB-LSD": LSDTOKEN,
    };
  }

  // Get the threads API token from the Instagram page
  private async _get_threads_api_token(): Promise<string> {
    // Make a GET request to the Instagram page and get the response
    // TODO: It seems like it does not need any headers to get the token, but I'm not sure
    const response = await axios.get("https://www.instagram.com/instagram");
    // Get the response data as a string
    const data = response.data as string;
    // Parse the data and get the token
    let match = data.match(/LSD",\[\],{"token":"(.*?)"},\d+\]/);
    // If no token is found, throw an error
    if (!match) {
      throw new Error("Token not found in the response");
    }
    // Get the token from the match
    let token = match ? match[1] : null;
    // Add the token to the default headers
    this.default_headers = { ...this.default_headers, "X-FB-LSD": token };
    this.threads_api_token = token;
    // Return the token
    return token;
  }

  async get_user(id: number): Promise<User> {
    const headers = {
      ...this.default_headers,
      "X-FB-Friendly-Name": "BarcelonaProfileRootQuery",
    };

    const response = await axios.post(
      this.THREADS_API_URL,
      {
        lsd: this.threads_api_token,
        variables: JSON.stringify({ userID: id }),
        doc_id: "23996318473300828",
      },
      { headers: headers }
    );

    const data = response.data as GetUser;
    return data.data.userData.user;
  }

  async get_user_threads(id: number): Promise<UserThreads> {
    const headers = {
      ...this.default_headers,
      "X-FB-Friendly-Name": "BarcelonaProfileThreadsTabQuery",
    };

    const response = await axios.post(
      this.THREADS_API_URL,
      {
        lsd: this.threads_api_token,
        variables: JSON.stringify({ userID: id }),
        doc_id: "6232751443445612",
      },
      { headers: headers }
    );

    return response.data;
  }

  async get_user_replies(id: number): Promise<UserThreads> {
    const headers = {
      ...this.default_headers,
      "X-FB-Friendly-Name": "BarcelonaProfileRepliesTabQuery",
    };
    const response = await axios.post(
      this.THREADS_API_URL,
      {
        lsd: this.threads_api_token,
        variables: JSON.stringify({ userID: id }),
        doc_id: "6307072669391286",
      },
      { headers: headers }
    );
    return response.data;
  }

  async get_thread(id: number): Promise<any> {
    const headers = {
      ...this.default_headers,
      "X-FB-Friendly-Name": "BarcelonaPostPageQuery",
    };
    const response = await axios.post(
      this.THREADS_API_URL,
      {
        lsd: this.threads_api_token,
        variables: JSON.stringify({ postID: id }),
        doc_id: "5587632691339264",
      },
      { headers: headers }
    );
    return response.data;
  }

  async get_thread_likers(id: number): Promise<any> {
    const response = await axios.post(
      this.THREADS_API_URL,
      {
        lsd: this.threads_api_token,
        variables: JSON.stringify({ mediaID: id }),
        doc_id: "9360915773983802",
      },
      { headers: this.default_headers }
    );
    return response.data;
  }
}
