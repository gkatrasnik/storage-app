import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadObject = (props) => {
  const [binary, setBinary] = useState(null);

  const uploadFile = async (file) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
    };
    console.log("binary", file);

    return axios.post(`/buckets/${props.bucket.id}/objects`, file, {
      headers: headers,
    });
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("reader", reader.result);
      setBinary(reader.result);
    };
    const input = document.querySelector("input");
    input.addEventListener(
      "change",
      (e) => {
        const [file] = e.target.files;
        reader.readAsBinaryString(file);
      },
      []
    );
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile(binary).then((response) => {
          console.log(response.data);
        });
      }}
      className="border p-3 my-3"
    >
      <h2>File Upload</h2>
      <input type="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadObject;
