import React from "react";

import { Delete, Edit } from "neetoicons";

export const MENUBAR_ITEMS = ["All", "draft", "published"];

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
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    dataIndex: "user",
    key: "user",
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
    key: "state",
    title: "Status",
    width: "20%",
    render: state => (
      <div className="flex space-x-2">
        {state[0].toUpperCase() + state.substring(1)}
      </div>
    ),
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
