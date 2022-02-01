import React, { useState, useEffect } from "react";

const AllBuckets = (props) => {
  const [buckets, setBuckets] = useState([]);

  return (
    <>
      <h2>Bucket list</h2>
      <div className="d-flex flex-column bg-white p-2">
        <div className="d-flex justify-content-between">
          <p className="section-text">All Buckets ({buckets.length})</p>
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
              <tr>
                <td>bucket</td>
                <td>Ljubljana</td>
              </tr>
              <tr>
                <td>bucket2</td>
                <td>Kranj</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllBuckets;
