import { Fragment, useState, useEffect } from "react";
import useAlert from "hooks/useAlert";

const Index = (props) => {
  const { gpsalert } = useAlert();
  useEffect(() => {
    gpsalert();
  }, []);

  return (
    <Fragment>

    </Fragment>
  );
};

export default Index;
