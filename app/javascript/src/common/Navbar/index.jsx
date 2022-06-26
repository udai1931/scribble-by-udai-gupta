import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { ExternalLink } from "neetoicons";
import { Link } from "react-router-dom";

import Button from "common/Button";
import { startCase } from "utils/changeCase";

import NavItem from "./NavItem";

import categoriesApi from "../../apis/categories";

function Navbar({ state, slug }) {
  const [articleSlug, setArticleSlug] = useState("");

  const fetchArticleFromFirstCategory = async () => {
    try {
      const res = await categoriesApi.listArticlesByCategories();
      const firstSlug = res?.data?.categories.find(firstCategoryWithArticles)
        .articles[0].slug;
      setArticleSlug(firstSlug);
    } catch (err) {
      logger.error(err);
    }
  };

  const firstCategoryWithArticles = category => category.articles.length > 0;

  useEffect(() => {
    if (slug) {
      setArticleSlug(slug);
    } else {
      fetchArticleFromFirstCategory();
    }
  }, [slug]);

  return (
    <div className="fixed top-0 flex h-16 w-full items-center border-b-2 bg-white px-12">
      <div className="flex flex-row space-x-4">
        <NavItem url="/" title="Scribble" />
        <NavItem url="/articles" title="Articles" />
        <NavItem url="/settings" title="Settings" />
        <NavItem url="/analytics" title="Analytics" />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        {state && (
          <div
            className={classNames("rounded-md py-1 px-3", {
              "bg-yellow-200 text-yellow-600": state === "draft",
              "bg-green-500 text-white": state === "published",
            })}
          >
            {startCase(state)}
          </div>
        )}
        <Link to={`/articles/${articleSlug}`} target="_blank">
          <Button
            title="Preview"
            icon={<ExternalLink size={16} />}
            bgColor="gray-300"
            color="black"
            disabled={!articleSlug}
            disabledMsg="No Published Article Available"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
