import React from "react";
import "../styles.css";

const DeleteBucketPrompt = (props) => {
  return (
    <div class="modal d-block">
      <div class="modal-dialog top-30">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Do you really want to delete this bucket?
            </h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onClick={props.toggleShowDeleteBucketPrompt}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => {
                props.deleteBucket();
                props.toggleShowDeleteBucketPrompt();
              }}
            >
              Delete
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={props.toggleShowDeleteBucketPrompt}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBucketPrompt;
