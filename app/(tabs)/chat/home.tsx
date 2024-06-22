import { Route } from "../../../types/route";
import StackHome from "../../../components/WebviewStackHome";

export default function Chat() {
  return <StackHome url={Route.chat} />;
}
