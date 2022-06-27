import React from "react";

import classnames from "classnames";
import { Tooltip } from "neetoui";

function Button({
  disabled = false,
  loading = false,
  disabledMsg = "Something Went Wrong",
  title,
  bgColor = "indigo-600",
  color = "white",
  onClick = () => null,
  icon = "",
  classes = "",
}) {
  return (
    <Tooltip
      position="bottom"
      content={disabledMsg}
      hideAfter={3000}
      disabled={!disabled}
    >
      <button
        disabled={loading}
        onClick={!disabled ? onClick : () => {}}
        className={classnames(
          `bg-${bgColor} text-${color} outline-none flex items-center justify-center space-x-2 rounded-sm px-4 py-2 font-medium ${classes}`,
          { "cursor-not-allowed opacity-50": disabled }
        )}
      >
        <p className={`text-${color}`}>{title}</p>
        {icon !== "" && icon}
      </button>
    </Tooltip>
  );
}

export default Button;
