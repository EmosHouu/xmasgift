import React from "react";
import { useIntl } from "gatsby-plugin-intl"
const Error = () => {
  const intl = useIntl();
  return (
    <h1 className="error">{intl.formatMessage({ id: "c_wrong_address" })}</h1>
  );
}
export default Error;
