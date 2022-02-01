import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bucket from "./Bucket";
const AllBuckets = (props) => {
  return (
    <>
      <h2 className="my-3">Bucket list</h2>
      <div className="d-flex flex-column bg-white p-2">
        <div className="d-flex justify-content-between">
          <p className="section-text">
            All Buckets ({props.buckets && props.buckets.length})
          </p>
          <button
            type="button"
            class="btn btn-primary btn-sm m-2"
            onClick={props.handleShowAddBucket}
          >
            Create New Bucket
          </button>
        </div>
        <div className="m-2">
          <div class="table">
            <div class="d-flex bg-grey px-2">
              <div className="col ">Name</div>
              <div className="col ">Location</div>
            </div>
            <div className="table-body">
              {props.buckets &&
                props.buckets.map((bucket) => (
                  <Link
                    to="/bucket"
                    state={{ bucketid: bucket.id }}
                    key={bucket.id}
                  >
                    <div className="d-flex align-items-center ">
                      <i class="fas fa-folder mx-2"></i>
                      <div className="col">{bucket.name}</div>
                      <div className="col">{bucket.location.name}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBuckets;
