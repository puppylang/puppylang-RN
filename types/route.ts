export enum Route {
  url = "http://localhost:3000",
  // url = "https://fffc-119-64-77-52.ngrok-free.app",
  user = "/user",
  chat = "/chat",
  walk = "/walk-role",
  posts = "/posts",
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
