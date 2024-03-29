import React from "react";

import { Modal, Typography, Input, Select } from "neetoui";

import Button from "common/Button";

function RestoreModal({
  showRestoreModal,
  setShowRestoreModal,
  selectedVersion,
  handleSubmit,
}) {
  return (
    <div>
      <Modal
        isOpen={showRestoreModal}
        size="md"
        onClose={() => setShowRestoreModal(false)}
      >
        <Modal.Header>
          <Typography style="h2" id="dialog1Title">
            Version History
          </Typography>
          <Typography style="body2">
            Version history of Setting up an account in Scribble
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2" lineHeight="normal"></Typography>
          <div className="m-2 mb-4 flex justify-between">
            <Input
              disabled
              label="Article Title"
              placeholder="Enter Title"
              className="mr-1 w-3/6 text-xs font-bold"
              value={selectedVersion?.title}
            />
            <Select
              isDisabled
              isSearchable
              placeholder="Select Category"
              className="ml-1 w-2/6"
              size="small"
              label="Category"
              value={selectedVersion?.category}
            />
          </div>
          <div className="m-2 flex h-40 justify-between">
            <textarea
              readOnly
              rows="13"
              className="border version-history-textarea w-full cursor-not-allowed rounded-sm border-gray-400 bg-disabled-gray p-2"
              value={selectedVersion?.body}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className=" flex space-x-2">
          <Button
            title="Restore Version"
            onClick={e =>
              handleSubmit(
                e,
                selectedVersion?.state,
                "restored",
                selectedVersion
              )
            }
          />
          <Button
            title="Cancel"
            color="black"
            bgColor="white"
            onClick={() => setShowRestoreModal(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RestoreModal;
