import React, { useState, useEffect } from "react";
import "../styles.css";

const DeleteObjectPrompt = (props) => {
  return (
    <div class="modal d-block">
      <div class="modal-dialog top-30">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Do you really want to delete this object?
            </h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onClick={props.toggleShowDeleteObjectPrompt}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => {
                props.deleteObject(props.currentObject.name);
                props.toggleShowDeleteObjectPrompt();
              }}
            >
              Delete
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={props.toggleShowDeleteObjectPrompt}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteObjectPrompt;
