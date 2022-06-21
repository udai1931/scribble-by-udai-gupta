import React from "react";

function Button({
  loading = false,
  title,
  bgColor = "indigo-600",
  color = "white",
  onClick = () => null,
  icon = "",
  classes = "",
}) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`bg-${bgColor} text-${color} outline-none flex items-center justify-center space-x-2 rounded-md px-4 py-2 font-medium ${classes}`}
    >
      <p className={`text-${color}`}>{title}</p>
      {icon !== "" && icon}
    </button>
  );
}

export default Button;
