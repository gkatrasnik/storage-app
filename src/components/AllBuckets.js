import React, { useState, useEffect } from "react";
import axios from "axios";

const AllBuckets = (props) => {
  const [buckets, setBuckets] = useState([]);

  const getAllBuckets = async () => {
    const response = await axios.get("/buckets", {
      headers: {
        Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
      },
    });

    const { data } = await response;
    console.log(data.buckets);
    setBuckets(data.buckets);
  };

  useEffect(() => {
    getAllBuckets();
  }, []);

  return (
    <>
      <h2>Bucket list</h2>
      <div className="d-flex flex-column bg-white p-2">
        <div className="d-flex justify-content-between">
          <p className="section-text">
            All Buckets ({buckets && buckets.length})
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
              {buckets &&
                buckets.map((bucket) => (
                  <tr key={bucket.id} bucket={bucket}>
                    <td>{bucket.name}</td>
                    <td>{bucket.location.name}</td>
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
