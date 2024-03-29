import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";

import organizationApi from "apis/organization";

function Header({ setShowSearchModal }) {
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
    <>
      <Typography
        style="h4"
        className="fixed top-0 z-20 flex h-16 w-full items-center justify-center border-b-2 bg-white"
      >
        {organizationName}
      </Typography>
      <div
        className="left-4 top-4 eui-search border absolute z-20 flex h-8 w-56 cursor-pointer items-center  pl-4 text-gray-400"
        onClick={() => setShowSearchModal(true)}
      >
        Search Article
      </div>
    </>
  );
}

export default Header;
