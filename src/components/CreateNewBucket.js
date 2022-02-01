import React, { useState, useEffect } from "react";
import "../styles.css";

const CreateNewBucket = (props) => {
  const [newLocation, setNewLocation] = useState();
  const [newBucketName, setNewBucketName] = useState("");
  return (
    <div>
      <p className="create-new-bucket-heading">Create New Bucket</p>
      <div className="d-flex flex-column bg-white p-2">
        <div className="row">
          <div class="col d-flex flex-column m-2">
            Bucket Name*
            <input
              type="text"
              onChange={(e) => setNewBucketName(e.target.value)}
            />
          </div>
          <div class="col d-flex flex-column  m-2">
            Bucket Location*
            <select onChange={(e) => setNewLocation(e.target.value)}>
              {props.locations &&
                props.locations.map((location, index) => (
                  <option key={index} location={location} value={newLocation}>
                    {location.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm m-2 small-button"
          onClick={props.handleShowAddBucket}
        >
          Create Bucket
        </button>
      </div>
    </div>
  );
};

export default CreateNewBucket;
