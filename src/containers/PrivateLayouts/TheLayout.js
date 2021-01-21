import React, { Fragment } from "react";
import TheContent from "./TheContent";
import PrivateHeader from './PrivateHeader'

const TheLayout = () => {
  return (
    <Fragment>
      <PrivateHeader/>
      <TheContent />
    </Fragment>
  );
};

export default TheLayout;
