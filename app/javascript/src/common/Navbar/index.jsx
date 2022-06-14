import React, { useEffect, useState } from "react";

import { ExternalLink } from "neetoicons";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import Button from "common/Button";

import NavItem from "./NavItem";

function Navbar() {
  const history = useHistory();
  const [articleSlug, setArticleSlug] = useState("");

  const fetchArticles = async () => {
    try {
      const res = await articlesApi.list();
      setArticleSlug(res.data.articles[0]?.slug);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleClick = () => {
    history.push(`/articles/${articleSlug}`);
  };

  return (
    <div className="flex h-16 items-center border-b-2 px-12">
      <div className="flex flex-row space-x-4">
        <NavItem url="/" title="Scribble" />
        <NavItem url="/articles" title="Articles" />
        <NavItem url="/settings" title="Settings" />
      </div>
      <div className="ml-auto">
        <Button
          title="Preview"
          icon={<ExternalLink size={16} />}
          onClick={handleClick}
          bgColor="gray-300"
          color="black"
        />
      </div>
    </div>
  );
}

export default Navbar;
