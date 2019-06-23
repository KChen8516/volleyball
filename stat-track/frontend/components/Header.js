import { Nav } from "./Nav";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
  // console.log("start triggered");
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log("complete triggered");
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export const Header = () => (
  <div>
    <Nav />
  </div>
);
