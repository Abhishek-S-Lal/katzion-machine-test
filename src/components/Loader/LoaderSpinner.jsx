import React from "react";
import clsx from "clsx";
import "./LoaderSpinner.scss";

const { Spinner } = require("react-bootstrap");

const LoaderSpinner = ({ type = "fixed" }) => {
  return (
    <div
      className={clsx(
        `loader-container-common`,
        `loader-container-common-${type}`
      )}
    >
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        className="spinner"
      >
        <span className="visually-hidden"></span>
      </Spinner>
    </div>
  );
};
export default LoaderSpinner;
