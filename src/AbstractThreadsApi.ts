import axios from "axios";

export abstract class AbstractThreadsApi {
  protected fetchHtmlHeaders: any;

  constructor() {
    this.fetchHtmlHeaders = {
      Authority: "www.threads.net",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://www.threads.net",
      Pragma: "no-cache",
      Referer: "https://www.instagram.com",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
    };
  }

  async getUserId(username: string): Promise<number> {
    const response = await axios.get(`https://www.threads.net/@${username}`, {
      headers: this.fetchHtmlHeaders,
    });
    const userIdKeyValue = response.data.match('"user_id":"(\\d+)"');
    const userId = Number(userIdKeyValue[1]);
    return userId;
  }

  getThreadId(urlId: string): number {
    const alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    let threadId = 0;

    for (let letter of urlId) {
      threadId = threadId * 64 + alphabet.indexOf(letter);
    }

    return threadId;
  }
}
