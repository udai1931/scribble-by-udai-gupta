import React from "react";

import { Typography } from "neetoui";

import { startCase } from "utils/changeCase";

function ScheduledUpdates({ scheduledUpdates = [] }) {
  return (
    <div className="h-full space-y-2 py-4 px-4">
      <Typography style="h3">Future Updates</Typography>
      <div className="space-y-2">
        {scheduledUpdates.map(update => (
          <div
            key={update.id}
            className="flex cursor-pointer items-center space-x-5"
          >
            <Typography style="h4" className="text-gray-400">
              {update.execution_time}
            </Typography>
            <Typography style="h4" className="text-indigo-600 ">
              Article {startCase(update.status)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduledUpdates;
