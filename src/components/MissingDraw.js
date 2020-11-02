import React from "react";
import { useIntl } from "gatsby-plugin-intl"

const MissingDraw = () => {
  const intl = useIntl();
  return (
    <h1 className="error">{intl.formatMessage({ id: "c_you_missed" })}</h1>);
};
export default MissingDraw;
