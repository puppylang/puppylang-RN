export enum Route {
  url = "https://puppylang.netlify.app",
  user = "/user",
  chat = "/chat",
  walk = "/walk-role",
  posts = "/posts",
}

export interface WebviewRouter {
  url: string;
  type: RouterMethod;

  token?: string;
  pushPage?: string;
  isStack?: boolean;
}

export enum RouterMethod {
  Push = "push",
  Replace = "replace",
  Back = "back",
}
