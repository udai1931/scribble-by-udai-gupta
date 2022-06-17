import React, { useState, useEffect } from "react";

import { Typography, Input } from "neetoui";

import sitedetailsApi from "apis/sitedetails";
import Button from "common/Button";

import bannerImage from "../../assets/images/password.png";
import authApi from "../apis/auth";
import { setAuthHeaders } from "../apis/axios";
import { setToLocalStorage } from "../utils/storage";

function EnterPassword() {
  const [password, setPassword] = useState("");

  const fetchName = async () => {
    try {
      await sitedetailsApi.show();
    } catch (err) {
      logger.error(err);
    }
  };

  const handleClick = async () => {
    try {
      const res = await authApi.login({ login: { password: password } });
      setToLocalStorage({
        authToken: res.data.auth_token,
        expiry: res.data.expiry,
      });
      setAuthHeaders();
      // window.location.href = "/"
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-68 mt-24 flex h-full flex-col">
        <img src={bannerImage} className="h-48" />
        <Typography style="h2">Spinkart is password protected!</Typography>
        <Typography style="body1">
          Enter Password to gain access to Spinkart
        </Typography>
        <div className="my-6">
          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="w-24">
          <Button title="Continue" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default EnterPassword;
