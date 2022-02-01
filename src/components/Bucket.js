import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UploadObject from "./UploadObject";
import moment from "moment";

const Bucket = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showUploadObject, setShowUploadObject] = useState(false);
  const [bucket, setBucket] = useState();
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState();
  const [objectsSize, setOjbectsSize] = useState(0);

  let navigate = useNavigate();
  const location = useLocation();
  const { bucketid } = location.state;

  const toggleShowUploadObject = () => {
    setShowUploadObject(!showUploadObject);
  };

  const getBucket = async () => {
    const headers = {
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    const response = await axios.get(`/buckets/${bucketid}`, {
      headers: headers,
    });

    setBucket(response.data.bucket);
    props.getAllBuckets();
  };

  const getObjects = async () => {
    const headers = {
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    const response = await axios.get(`/buckets/${bucketid}/objects`, {
      headers: headers,
    });

    setObjects(response.data.objects);

    let objectsSize = 0;
    for (let i = 0; i < response.data.objects.length; i++) {
      objectsSize += response.data.objects[i].size;
    }
    setOjbectsSize(objectsSize);

    props.getAllBuckets();
  };

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

  const handleSelectObject = (object) => {
    setSelectedObject(object.name);
    console.log(object.name);
  };
  // on component mount
  useEffect(() => {
    getBucket();
    getObjects();
  }, []);

  const deleteObject = () => {
    const headers = {
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    axios.delete(`/buckets/${bucket.id}/objects${selectedObject.name}`, {
      headers: headers,
    });

    getObjects();
  };

  return (
    <div>
      <h2 className="my-3">{bucket && bucket.name}</h2>
      {showUploadObject && (
        <UploadObject
          bucket={bucket}
          toggleShowUploadObject={toggleShowUploadObject}
          getObjects={getObjects}
        />
      )}
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
              <p> Storage size: {objectsSize}</p>
            </div>
            <div className="col d-flex justify-content-end align-items-start">
              <button className="btn btn-danger btn-sm " onClick={deleteBucket}>
                Delete bucket
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-3 tab-content">
          <div className="d-flex justify-content-between">
            <p>All Files ({objects && objects.length})</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger btn-sm mx-2"
                onClick={deleteObject}
              >
                Delete Object
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={toggleShowUploadObject}
              >
                Upload object
              </button>
            </div>
          </div>

          <div className="table-body my-3">
            {objects &&
              objects.map((object) => (
                <div
                  className="d-flex object-item"
                  key={object.last_modified}
                  onClick={(e) => {
                    handleSelectObject(object);
                  }}
                >
                  <div className="col">{object.name}</div>
                  <div className="col">{object.last_modified}</div>
                  <div className="col">{object.size}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bucket;
