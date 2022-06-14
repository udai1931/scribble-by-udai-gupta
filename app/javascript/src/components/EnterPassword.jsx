import React from "react";

import { Typography, Input } from "neetoui";

import Button from "common/Button";

import bannerImage from "../../assets/images/password.png";

function EnterPassword() {
  return (
    <div className="flex justify-center">
      <div className="w-68 mt-24 flex h-full flex-col">
        <img src={bannerImage} className="h-48" />
        <Typography style="h2">Spinkart is passwor protected!</Typography>
        <Typography style="body1">
          Enter Password to gain access to Spinkart
        </Typography>
        <div className="my-6">
          <Input label="Password" placeholder="Enter Password" />
        </div>
        <div className="w-24">
          <Button title="Continue" />
        </div>
      </div>
    </div>
  );
}

export default EnterPassword;
