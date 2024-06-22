import StackHome from "../../../components/WebviewStackHome";
import { Route } from "../../../types/route";

export default function Post() {
  return <StackHome url={Route.posts} />;
}
