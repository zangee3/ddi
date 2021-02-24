import React from "react";
import MXOptions from "../views/Components/mx/MXOptions";
import HostRecords from "../views/Components/host/HostRecords";
import TxtOptions from "../views/Components/txt/TxtOptions";

const DnsSetting = React.lazy(() =>
  import("../views/Pages/PrivatePages/DnsSetting")
);
const Firewall = React.lazy(() =>
  import("../views/Pages/PrivatePages/Firewall")
);
const Home = React.lazy(() => import("../views/Pages/PrivatePages/Home"));
const Network = React.lazy(() => import("../views/Pages/PrivatePages/Network"));

/**
 * @returns {JSX.Element}
 * @constructor
 */
const NoPageFound = () => {
  return <h1>404 Page not found</h1>;
};

const routes = [
  { path: "/", exact: true, name: "home", component: Home },
  { path: "/home", exact: true, name: "home", component: Home },
  { path: "/firewall", exact: true, name: "Firewall", component: Firewall },
  { path: "/network", exact: true, name: "Network", component: Network },
  { path: "/ddi", exact: true, name: "ddi", component: DnsSetting },
  { path: "/ddi/mx", exact: true, name: "mx", component: MXOptions },
  { path: "/ddi/host", exact: true, name: "host", component: HostRecords },
  { path: "/ddi/txt", exact: true, name: "txt", component: TxtOptions },
  { path: "**", component: NoPageFound },
];

export default routes;
