import axios from "axios";
import { AbstractThreadsApi } from "./AbstractThreadsApi";

export class PublicThreadsApi extends AbstractThreadsApi {
  THREADS_API_URL = "https://www.threads.net/api/graphql";
  threads_api_token: string;
  default_headers: any;

  constructor() {
    super();
    // this.threads_api_token = await this._get_threads_api_token();
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
    };
  }

  async initialize() {
    this.threads_api_token = await this._get_threads_api_token();
  }

  private async _get_threads_api_token(): Promise<string> {
    // Assuming default_headers is a class property similar to default_headers
    const response = await axios.get("https://www.instagram.com/instagram");
    const data = response.data as string;
    let match = data.match(/LSD",\[\],{"token":"(.*?)"},\d+\]/);

    // const match = /LSD",\[\],{"token":"(.*?)"},\d+\]/.exec(response.data);
    if (!match) {
      throw new Error("Token not found in the response");
    }
    let token = match ? match[1] : null;
    console.log(token);

    this.default_headers = { ...this.default_headers, "X-FB-LSD": token };
    return token;
  }

  async get_user(id: string): Promise<any> {
    const headers = {
      ...this.default_headers,
      "X-FB-Friendly-Name": "BarcelonaProfileRootQuery",
    };

    console.log({
      lsd: this.threads_api_token,
      variables: JSON.stringify({ userID: id }),
      doc_id: "23996318473300828",
    });
    console.log(headers);
    const response = await axios.post(
      this.THREADS_API_URL,
      {
        lsd: this.threads_api_token,
        variables: JSON.stringify({ userID: id }),
        doc_id: "23996318473300828",
      },
      { headers: headers }
    );
    return response.data;
  }

  async get_user_threads(id: number): Promise<any> {
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

  async get_user_replies(id: number): Promise<any> {
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
