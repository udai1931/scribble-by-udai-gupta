import React from "react";

import classnames from "classnames";
import { Typography } from "neetoui";
import { Link, useLocation } from "react-router-dom";

function NavItem({ url = "/", title = "" }) {
  const location = useLocation();

  return (
    <Link to={url}>
      <Typography
        style="h2"
        className={classnames({ "text-indigo-600": location.pathname === url })}
      >
        {title}
      </Typography>
    </Link>
  );
}

export default NavItem;
