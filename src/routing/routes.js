import React from "react";

const DnsSetting = React.lazy(() =>
  import("../views/Pages/PrivatePages/DnsSetting/DnsSetting")
);

/**
 * @returns {JSX.Element}
 * @constructor
 */
const NoPageFound = () => {
  return <h1>404 Page not found</h1>;
};

const routes = [
  { path: "/", name: "DnsSetting", component: DnsSetting },
  { path: "/dns/setting", name: "DnsSetting", component: DnsSetting },
  { path: "**", component: NoPageFound }
];

export default routes;
