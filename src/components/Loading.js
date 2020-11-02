import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons'

const Loading = () => (
  <div className="loading">
    <div className="snowflake"><FontAwesomeIcon icon={faSnowflake} size="3x"/></div>
  </div>
);
export default Loading;
