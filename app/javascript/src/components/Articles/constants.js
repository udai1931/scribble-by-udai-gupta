import React from "react";

import { Delete, Edit } from "neetoicons";

export const MENUBAR_ITEMS = ["All", "Draft", "Published"];

export const TABLE_COLUMNS_FOR_DROPDOWN = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    width: "20%",
  },
  {
    dataIndex: "author",
    key: "author",
    title: "Author",
    width: "20%",
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "Date",
    width: "20%",
  },
  {
    dataIndex: "category",
    key: "category",
    title: "Category",
    width: "20%",
  },
  {
    dataIndex: "title",
    key: "title",
    title: "Status",
    width: "20%",
  },
];

export const TABLE_COLUMNS_FOR_TABLE = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    width: "20%",
  },
  {
    dataIndex: "author",
    key: "author",
    title: "Author",
    width: "20%",
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "Date",
    width: "20%",
  },
  {
    dataIndex: "category",
    key: "category",
    title: "Category",
    width: "20%",
  },
  {
    dataIndex: "state",
    key: "title",
    title: "Status",
    width: "20%",
  },
  {
    dataIndex: "actions",
    key: "actions",
    title: "",
    width: "20%",
    render: () => (
      <div className="flex space-x-2">
        <Delete className="delete" action="delete" />
        <Edit className="edit" action="edit" />
      </div>
    ),
  },
];
