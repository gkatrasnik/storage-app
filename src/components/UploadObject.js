import React, { useState } from "react";
import axios from "axios";

const UploadObject = (props) => {
  const [file, setFile] = useState(null);

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };

    return axios.post(`/buckets/${props.bucket.id}/objects`, formData, {
      headers: headers,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile(file).then((response) => {
          console.log(response.data);
        });
      }}
    >
      <h1>File Upload</h1>
      <input
        type="file"
        onChange={(e) => setFile({ file: e.target.files[0] })}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadObject;
