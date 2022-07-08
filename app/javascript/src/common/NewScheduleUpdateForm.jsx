import React from "react";

import { Pane, Typography, DatePicker, TimePicker, Radio } from "neetoui";

import Button from "common/Button";

function NewScheduleUpdateForm({
  isPaneOpen,
  setIsPaneOpen,
  date,
  setDate,
  time,
  setTime,
  scheduleUpdateState,
  setScheduleUpdateState,
  handleScheduleUpdateSubmit,
}) {
  return (
    <Pane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)}>
      <Pane.Header>
        <Typography style="h3">Schedule an Update</Typography>
      </Pane.Header>
      <Pane.Body className="flex flex-col space-y-6">
        <div className="w-full">
          <Typography>Date</Typography>
          <DatePicker
            dateFormat="YYYY-MM-DD"
            onChange={(e, str) => {
              setDate(str);
            }}
            getPopupContainer={triggerNode => triggerNode.parentNode}
          />
        </div>
        <div className="w-full">
          <Typography>Time</Typography>
          <TimePicker
            onChange={(e, str) => {
              setTime(str);
            }}
            timeFormat="HH:mm:ss"
            getPopupContainer={triggerNode => triggerNode.parentNode}
          />
        </div>
        <div>
          <Radio
            value={scheduleUpdateState}
            onChange={e => setScheduleUpdateState(e.target.value)}
          >
            <Radio.Item label="Draft" name="Draft" value="draft" />
            <Radio.Item label="Publish" name="Publish" value="published" />
          </Radio>
        </div>
        <Button
          title="Submit"
          disabled={!date || !time}
          disabledMsg="Please fill out all fields"
          onClick={handleScheduleUpdateSubmit}
        />
      </Pane.Body>
    </Pane>
  );
}

export default NewScheduleUpdateForm;
