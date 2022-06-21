import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Edit, Delete } from "neetoicons";
import { Typography } from "neetoui";
import { Alert } from "neetoui";

import redirectionsApi from "apis/redirections";

import NewRedirectionRow from "./NewRedirectionRow";

function RedirectionsComponent() {
  const [redirections, setRedirections] = useState([]);
  const [newRedirectionToggle, setNewRedirectionToggle] = useState(false);
  const [newRedirection, setNewRedirection] = useState({ from: "", to: "" });
  const [editRedirectionToggle, setEditRedirectionToggle] = useState("");
  const [editRedirection, setEditRedirection] = useState("");
  const [selectedRedirectionForDelete, setSelectedRedirectionForDelete] =
    useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchRedirections = async () => {
    try {
      const res = await redirectionsApi.list();
      setRedirections([...res.data.redirections]);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  const createRedirection = async () => {
    try {
      await redirectionsApi.create({
        redirection: { from: newRedirection.from, to: newRedirection.to },
      });
      setNewRedirection({});
      setNewRedirectionToggle(false);
      fetchRedirections();
    } catch (err) {
      logger.error(err);
    }
  };

  const updateRedirection = async () => {
    try {
      await redirectionsApi.update({
        id: editRedirectionToggle,
        payload: { from: editRedirection.from, to: editRedirection.to },
      });
      setEditRedirection("");
      setEditRedirectionToggle("");
      fetchRedirections();
    } catch (err) {
      logger.error(err);
    }
  };

  const deleteRedirection = async () => {
    try {
      await redirectionsApi.destroy({ id: selectedRedirectionForDelete });
      setShowAlert(false);
      setSelectedRedirectionForDelete("");
      fetchRedirections();
    } catch (err) {
      logger.error(err);
    }
  };

  const handleEditClick = redirection => {
    setEditRedirectionToggle(redirection.id);
    setEditRedirection(redirection);
  };

  const handleDeleteClick = redirection => {
    setSelectedRedirectionForDelete(redirection.id);
    setShowAlert(true);
  };

  return (
    <div className="my-8 w-8/12">
      <Alert
        isOpen={showAlert}
        size="sm"
        title="Delete Redirection"
        message="Are you sure you want to delete? This action is irreversible."
        onClose={() => setShowAlert(false)}
        onSubmit={deleteRedirection}
      />
      <Typography style="h2">Redirections</Typography>
      <Typography style="body1">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status to be SEO
        friendly.
      </Typography>
      <div className="bg-indigo-100 px-6">
        <div className="flex justify-between pt-6 pb-4 font-semibold text-gray-500">
          <Typography className="w-2/6">From Path</Typography>
          <Typography className="w-2/6">To Path</Typography>
          <Typography className="w-1/6">Actions</Typography>
        </div>
        {redirections.map(redirection =>
          editRedirectionToggle !== redirection.id ? (
            <div
              key={redirection.id}
              className="my-2 flex h-16 items-center justify-between bg-white px-4"
            >
              <div className="flex w-2/6 space-x-4 font-semibold">
                <span className="text-gray-400">https://scribble.com</span>
                {redirection.from}
              </div>
              <div className="flex w-2/6 space-x-4 font-semibold">
                <span className="text-gray-400">https://scribble.com</span>
                {redirection.to}
              </div>
              <div className="ml flex w-1/6 cursor-pointer justify-around space-x-2">
                <Delete
                  size={20}
                  onClick={() => handleDeleteClick(redirection)}
                />
                <Edit size={20} onClick={() => handleEditClick(redirection)} />
              </div>
            </div>
          ) : (
            <NewRedirectionRow
              key={redirection.id}
              value={editRedirection}
              setValue={setEditRedirection}
              handleSubmit={updateRedirection}
            />
          )
        )}
        <div className="py-3 text-indigo-600">
          {!newRedirectionToggle ? (
            <div
              className="flex items-center"
              onClick={() => setNewRedirectionToggle(prev => !prev)}
            >
              <Plus size={16} />
              <Typography style="body1" className="ml-2">
                Add new redirection
              </Typography>
            </div>
          ) : (
            <NewRedirectionRow
              value={newRedirection}
              setValue={setNewRedirection}
              handleSubmit={createRedirection}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RedirectionsComponent;
