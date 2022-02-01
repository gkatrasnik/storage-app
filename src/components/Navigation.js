import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <Link to="/" class="navbar-brand mx-4">
        Secure Cloud Storage
      </Link>
    </nav>
  );
};

export default Navigation;
