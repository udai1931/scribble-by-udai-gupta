import React from "react";

import { Typography } from "neetoui";

function VersionHistory({ setShowRestoreModal }) {
  return (
    <div className="version-history-container mt-16 space-y-2 overflow-auto border-l-2 py-6 px-4">
      <Typography style="h3">Version History</Typography>
      <Typography style="body1">
        Version history of Setting up an account in Scribble
      </Typography>
      <div className="space-y-2">
        <div
          className="flex cursor-pointer items-center space-x-6"
          onClick={() => setShowRestoreModal(true)}
        >
          <Typography style="h4" className="text-gray-400">
            10:00AM, 12/20/2021
          </Typography>
          <Typography style="h4" className="text-indigo-600 ">
            Article Drafted
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default VersionHistory;
