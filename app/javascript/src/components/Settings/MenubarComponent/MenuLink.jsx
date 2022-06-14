import React from "react";

import classnames from "classnames";
import { Typography } from "neetoui";
import { useHistory, useLocation } from "react-router-dom";

function MenuLink({ title, description, Icon, url }) {
  const location = useLocation();
  const pathname = location.pathname;
  const history = useHistory();

  return (
    <div
      className={classnames(
        "my-3 flex h-16 cursor-pointer items-center justify-center px-4 py-6",
        { "bg-indigo-100": pathname === url }
      )}
      onClick={() => history.push(url)}
    >
      <Icon
        size={32}
        className={classnames("mr-auto ", {
          "text-gray-500": pathname !== url,
        })}
      />
      <div className="w-full pl-4 ">
        <Typography style="h4">{title}</Typography>
        <Typography style="body3">{description}</Typography>
      </div>
    </div>
  );
}

export default MenuLink;
