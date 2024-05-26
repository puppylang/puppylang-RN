export enum Route {
  // url = "http://192.168.219.102:3000",
  // url = "http://192.168.219.103:3000",
  url = "http://localhost:3000",
  profile = "/user",
  chat = "/chat",
  stroll = "/stroll",
}

export interface WebviewRouter {
  url: string;
  type: RouterMethod;

  pushPage?: string;
  isStack?: boolean;
}

export enum RouterMethod {
  Push = "push",
  Replace = "replace",
  Back = "back",
}
