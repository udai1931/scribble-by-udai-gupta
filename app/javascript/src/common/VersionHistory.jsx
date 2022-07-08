import React from "react";

import { Typography } from "neetoui";

import { startCase } from "utils/changeCase";

function VersionHistory({ setShowRestoreModal, versions, setSelectedVersion }) {
  const handleVersionClick = version => {
    setSelectedVersion(version);
    setShowRestoreModal(true);
  };

  return (
    <div className="space-y-2 py-4 px-4">
      <Typography style="h3">Version History</Typography>
      <Typography style="body1">
        Version history of Setting up an account in Scribble
      </Typography>
      <div className="space-y-2">
        {versions.map(version => (
          <div
            key={version.id}
            className="flex cursor-pointer items-center space-x-5"
            onClick={() => handleVersionClick(version)}
          >
            <Typography style="h4" className="text-gray-400">
              {version.created_at}
            </Typography>
            <Typography style="h4" className="text-indigo-600 ">
              Article {startCase(version.tag)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VersionHistory;
