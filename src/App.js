import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import CreateNewBucket from "./components/CreateNewBucket";
import AllBuckets from "./components/AllBuckets";

const App = () => {
  const [showAddBucket, setShowAddBucket] = useState(true);

  const handleShowAddBucket = () => {
    setShowAddBucket(!showAddBucket);
  };

  return (
    <div className="container">
      {showAddBucket && <CreateNewBucket />}
      <AllBuckets handleShowAddBucket={handleShowAddBucket} />
    </div>
  );
};

export default App;
