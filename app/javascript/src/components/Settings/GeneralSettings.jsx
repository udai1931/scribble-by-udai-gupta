import React, { useEffect, useState } from "react";

import { Input, Typography, Checkbox } from "neetoui";

import sitedetailsApi from "apis/sitedetails";
import Button from "common/Button";

function GeneralSettings() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const updateDetails = async () => {
    try {
      await sitedetailsApi.update({
        details: { name: name, password: password },
      });
    } catch (err) {
      logger.error(err);
    }
  };

  const fetchDetails = async () => {
    try {
      const res = await sitedetailsApi.show({ details: { name, password } });
      setName(res.data.details.name);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchDetails();
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
        <Button title="Save Changes" onClick={updateDetails} />
        <Button title="Cancel" color="black" bgColor="white" />
      </div>
    </div>
  );
}

export default GeneralSettings;
