import React, { useState, useEffect } from "react";
import axios from "axios";

const AllBuckets = (props) => {
  return (
    <>
      <h2>Bucket list</h2>
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
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              {props.buckets &&
                props.buckets.map((bucket) => (
                  <tr key={bucket.id} bucket={bucket}>
                    <Link to="/bucket" state={{ bucket: bucket }}>
                      <td>{bucket.name}</td>
                      <td>{bucket.location.name}</td>
                    </Link>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllBuckets;
