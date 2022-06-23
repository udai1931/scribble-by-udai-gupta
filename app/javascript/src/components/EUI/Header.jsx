import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";

import organizationApi from "apis/organization";

function Header() {
  const [organizationName, setOrganizationName] = useState("");

  const fetchNameOfOrganization = async () => {
    try {
      const res = await organizationApi.show();
      setOrganizationName(res.data.organization?.name);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchNameOfOrganization();
  }, []);

  return (
    <Typography
      style="h4"
      className="fixed top-0 z-10 flex h-16 w-full items-center justify-center border-b-2 bg-white"
    >
      {organizationName}
    </Typography>
  );
}

export default Header;
