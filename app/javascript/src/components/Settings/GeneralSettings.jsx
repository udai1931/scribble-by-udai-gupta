import React, { useEffect, useState } from "react";

import { Check, Close } from "neetoicons";
import { Input, Typography, Checkbox } from "neetoui";

import organizationApi from "apis/organization";
import Button from "common/Button";

function GeneralSettings() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  const updateOrganization = async () => {
    try {
      await organizationApi.update({
        organization: {
          name: name,
          password: password,
          is_password_protected: showPassword,
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
      setShowPassword(res.data.organization.is_password_protected);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const validation1 = password?.length > 5;
  const validation2 = regex.test(password);

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
        <>
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            className="my-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="my-2 flex items-center space-x-4">
            {validation1 ? (
              <Check className="text-green-600" />
            ) : (
              <Close className="text-red-600" />
            )}{" "}
            Have at least 6 characters
          </div>
          <div className="my-2 flex items-center space-x-12">
            {validation2 ? (
              <Check className="text-green-600" />
            ) : (
              <Close className="text-red-600" />
            )}{" "}
            Include atleast one letter and one number
          </div>
        </>
      )}
      <div className="mt-4 flex space-x-2">
        <Button
          title="Save Changes"
          onClick={updateOrganization}
          disabled={showPassword && !(validation1 && validation2)}
          disabledMsg="Please follow the above validations"
        />
        <Button title="Cancel" color="black" bgColor="white" />
      </div>
    </div>
  );
}

export default GeneralSettings;
