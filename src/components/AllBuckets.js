import React, { useState, useEffect } from "react";

const AllBuckets = (props) => {
  return (
    <>
      <button
        type="button"
        class="btn btn-primary btn-sm m-2"
        onClick={props.handleShowAddBucket}
      >
        Create New Bucket
      </button>
    </>
  );
};

export default AllBuckets;
