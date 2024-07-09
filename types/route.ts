export enum Route {
  url = "https://puppylang.netlify.app",
  user = "/user",
  chat = "/chat",
  walk = "/walk-role",
  posts = "/posts",
}

export interface WebviewRequestType {
  url: string;
  type: WebviewType;

  token?: string;
  pushPage?: string;
  isStack?: boolean;
}

export enum WebviewType {
  Push = "push",
  Replace = "replace",
  Back = "back",
  UpdateToken = "updateToken",
}
