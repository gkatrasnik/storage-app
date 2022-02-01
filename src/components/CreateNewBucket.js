import React, { useState, useEffect } from "react";
import "../styles.css";
import axios from "axios";

const CreateNewBucket = (props) => {
  const [newLocation, setNewLocation] = useState(""); //location id
  const [newBucketName, setNewBucketName] = useState("");

  const [locationsList, setLocationsList] = useState([]);

  const getLocationsList = async () => {
    const response = await axios.get("/locations", {
      headers: {
        Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
      },
    });
    const { data } = await response;
    console.log(data);
    setLocationsList(data.locations);
    setNewLocation(data.locations[0].id);
  };

  useEffect(() => {
    getLocationsList();
  }, []);

  const postNewBucket = async () => {
    if (!newBucketName || !newLocation) {
      return alert("Bucket name and location is needed!");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    const response = await axios.post(
      "/buckets",
      {
        name: newBucketName,
        location: newLocation,
      },
      {
        headers: headers,
      }
    );

    console.log(response);
    setNewBucketName("");
    setNewLocation("");
  };

  useEffect(() => {
    getLocationsList();
  }, []);

  return (
    <div>
      <p className="section-text">Create New Bucket</p>
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
              {locationsList &&
                locationsList.map((location, index) => (
                  <option key={index} location={location} value={location.id}>
                    {location.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm m-2 small-button"
          onClick={() => {
            postNewBucket();
            props.handleShowAddBucket;
          }}
        >
          Create Bucket
        </button>
      </div>
    </div>
  );
};

export default CreateNewBucket;
