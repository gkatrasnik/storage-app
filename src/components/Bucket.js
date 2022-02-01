import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Bucket = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const { bucket } = location.state;

  const deleteBucket = () => {
    const headers = {
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    axios.delete(`/buckets/${bucket.id}`, {
      headers: headers,
    });

    props.getAllBuckets();
    navigate("/");
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li>
          <div
            className="py-2 px-3 bg-white tab"
            onClick={(e) => setShowDetails(false)}
          >
            Files
          </div>
        </li>
        <li>
          <div
            className="py-2 px-3 bg-white tab"
            onClick={(e) => setShowDetails(true)}
          >
            Details
          </div>
        </li>
      </ul>

      {showDetails ? (
        <div className="bg-white p-3 tab-content">
          <div className="d-flex justify-content-between">
            <div className="col">
              <p>Bucket name: {bucket.name}</p>
              <p>Location: {bucket.location.name}</p>
              <p> Storage size: bucket size</p>
            </div>
            <div className="col d-flex justify-content-end align-items-start">
              <button className="btn btn-danger btn-sm" onClick={deleteBucket}>
                Delete bucket
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-3 tab-content">
          <h3>Files</h3>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      )}
    </div>
  );
};

export default Bucket;
