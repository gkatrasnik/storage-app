import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UploadObject from "./UploadObject";
import moment from "moment";
import DeleteBucketPrompt from "./DeleteBucketPrompt";
import DeleteObjectPrompt from "./DeleteObjectPrompt";

const Bucket = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showUploadObject, setShowUploadObject] = useState(false);
  const [bucket, setBucket] = useState();
  const [objects, setObjects] = useState([]);
  const [objectsSize, setOjbectsSize] = useState(0);
  const [showDeleteBucketPrompt, setShowDeleteBucketPrompt] = useState(false);
  const [showDeleteObjectPrompt, setShowDeleteObjectPrompt] = useState(false);
  const [currentObject, setCurrentObject] = useState();

  let navigate = useNavigate();
  const location = useLocation();
  const { bucketid } = location.state;

  const toggleShowUploadObject = () => {
    setShowUploadObject(!showUploadObject);
  };

  const toggleShowDeleteBucketPrompt = () => {
    setShowDeleteBucketPrompt(!showDeleteBucketPrompt);
  };

  const toggleShowDeleteObjectPrompt = () => {
    setShowDeleteObjectPrompt(!showDeleteObjectPrompt);
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

    //calculate storage size
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

  const deleteObject = (objectname) => {
    const headers = {
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    axios
      .delete(`/buckets/${bucket.id}/objects/${objectname}`, {
        headers: headers,
      })
      .then(getObjects());
    getBucket();
    setShowDetails(false);
  };

  // on component mount
  useEffect(() => {
    getBucket();
    getObjects();
  }, []);

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
        <>
          {showDeleteBucketPrompt && (
            <DeleteBucketPrompt
              deleteBucket={deleteBucket}
              toggleShowDeleteBucketPrompt={toggleShowDeleteBucketPrompt}
            />
          )}
          <div className="bg-white p-3 tab-content">
            <div className="d-flex justify-content-between">
              <div className="col">
                <p>Bucket name: {bucket.name}</p>
                <p>Location: {bucket.location.name}</p>
                <p> Storage size: {objectsSize}</p>
              </div>
              <div className="col d-flex justify-content-end align-items-start">
                <button
                  className="btn btn-danger btn-sm "
                  onClick={toggleShowDeleteBucketPrompt}
                >
                  Delete bucket
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-3 tab-content">
          <div className="d-flex justify-content-between">
            <p>All Files ({objects && objects.length})</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={toggleShowUploadObject}
              >
                Upload object
              </button>
            </div>
          </div>

          <div className="my-3 table">
            <div class="d-flex border-bottom-black bg-grey px-2">
              <div className="col">Name</div>
              <div className="col">Last modified</div>
              <div className="col">Size</div>
            </div>
            {objects &&
              objects.map((thisobject) => (
                <div
                  className="d-flex align-items-center object-item border-0 p-2"
                  key={thisobject.last_modified}
                >
                  <i class="fas fa-file mx-2"></i>
                  <div className="col">{thisobject.name}</div>
                  <div className="col px-5">{thisobject.last_modified}</div>
                  <div className="col ">{thisobject.size}</div>
                  <button
                    className="btn btn-danger btn-sm mx-3"
                    onClick={() => {
                      setCurrentObject(thisobject);
                      toggleShowDeleteObjectPrompt();
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          {showDeleteObjectPrompt && (
            <DeleteObjectPrompt
              currentObject={currentObject}
              deleteObject={deleteObject}
              toggleShowDeleteObjectPrompt={toggleShowDeleteObjectPrompt}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Bucket;
