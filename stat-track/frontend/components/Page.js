import { Header } from "./Header";
import { Meta } from "./Meta";

export const Page = (props) => {
  return (
    <div>
      <Meta />
      <Header />
      {props.children}
    </div>
  );
};
