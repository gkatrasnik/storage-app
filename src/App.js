import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import CreateNewBucket from "./components/CreateNewBucket";
import AllBuckets from "./components/AllBuckets";
import Bucket from "./components/Bucket";
import Navigation from "./components/Navigation";
import { Route, Routes, HashRouter } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [showAddBucket, setShowAddBucket] = useState(false);
  const [buckets, setBuckets] = useState([]);

  const handleShowAddBucket = () => {
    setShowAddBucket(!showAddBucket);
  };

  const getAllBuckets = async () => {
    const response = await axios.get("/buckets", {
      headers: {
        Authorization: "Token " + "79a700aa-428b-4dcc-b8c4-27a25eabc619",
      },
    });

    const { data } = await response;
    setBuckets(data.buckets);
  };

  useEffect(() => {
    getAllBuckets();
  }, []);

  return (
    <HashRouter>
      <Navigation />
      <div className="container">
        {showAddBucket && (
          <CreateNewBucket
            handleShowAddBucket={handleShowAddBucket}
            getAllBuckets={getAllBuckets}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <AllBuckets
                buckets={buckets}
                handleShowAddBucket={handleShowAddBucket}
              />
            }
          />
          <Route
            path="/bucket"
            element={<Bucket getAllBuckets={getAllBuckets} />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
