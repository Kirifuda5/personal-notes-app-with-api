import React from "react";
import PropTypes from "prop-types";

export default function EmptyState({ message }) {
  return <div className="empty">{message}</div>;
}

EmptyState.propTypes = { message: PropTypes.string };
