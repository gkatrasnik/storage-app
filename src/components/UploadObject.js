import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadObject = (props) => {
  const [file, setFile] = useState(null);

  const uploadFile = async (newFile) => {
    const headers = {
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };
    const data = new FormData();

    data.append("file", newFile);

    await axios.post(`/buckets/${props.bucket.id}/objects`, data, {
      headers: headers,
    });

    setFile(null);
    props.toggleShowUploadObject();
    props.getObjects();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile(file);
      }}
      className="border p-3 my-3"
    >
      <h2>File Upload</h2>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadObject;
