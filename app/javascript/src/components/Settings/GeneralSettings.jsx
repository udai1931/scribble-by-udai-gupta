import React, { useEffect, useState } from "react";

import { Input, Typography, Checkbox } from "neetoui";

import organizationApi from "apis/organization";
import Button from "common/Button";

function GeneralSettings() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const updateOrganization = async () => {
    try {
      await organizationApi.update({
        organization: {
          name: name,
          password: password,
          auth_status: showPassword,
        },
      });
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchOrganization = async () => {
    try {
      const res = await organizationApi.show();
      setName(res.data.organization.name);
      setShowPassword(res.data.organization.auth_status);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <div className="w-100 my-8">
      <Typography style="h2">General Settings</Typography>
      <Typography style="body1">
        Configure genral attributes of scribble
      </Typography>
      <div className="mt-4">
        <Input
          label="Site Name"
          helpText="Customize the site name which is used to show the site name in "
          className="mt-4"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <Typography style="h6">Open Graph Tags.</Typography>
      <hr className="my-5" />
      <div className="mb-4 font-bold">
        <Checkbox
          label="Password Protect Knowledge Base"
          checked={showPassword}
          onChange={() => setShowPassword(prev => !prev)}
          className="font-bold"
        />
      </div>
      {showPassword && (
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          className="my-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}
      <div className="mt-4 flex space-x-2">
        <Button title="Save Changes" onClick={updateOrganization} />
        <Button title="Cancel" color="black" bgColor="white" />
      </div>
    </div>
  );
}

export default GeneralSettings;
