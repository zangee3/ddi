import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";

import "../../../../App.css";

const DnsSetting = (props) => {

  useEffect(() => {
    props.history.push("/ddi/mx")
  }, [])

  return <h1>&nbsp;</h1>;
};

export default DnsSetting;
