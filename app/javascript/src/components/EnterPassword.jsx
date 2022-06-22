import React, { useState } from "react";

import { Typography, Input } from "neetoui";
import { useHistory } from "react-router-dom";

import authApi from "apis/auth";
import Button from "common/Button";
import { setToLocalStorage } from "utils/storage";

import bannerImage from "../../assets/images/password.png";

function EnterPassword({ isLoggedIn, name }) {
  const [password, setPassword] = useState("");
  const history = useHistory();

  if (isLoggedIn) {
    history.push("/articles");
  }

  const handleClick = async () => {
    try {
      const res = await authApi.login({ login: { password: password } });
      setToLocalStorage("authToken", res.data.auth_token);
      setToLocalStorage("expiry", res.data.expiry);
      window.location.href = "/articles";
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-68 mt-24 flex h-full flex-col">
        <img src={bannerImage} className="h-48" />
        <Typography style="h2">{name} is password protected!</Typography>
        <Typography style="body1">
          Enter Password to gain access to {name}
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
