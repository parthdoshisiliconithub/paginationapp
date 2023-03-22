import React from "react";
import './App.css'
import Search from "./Search";
import Pagination from "./Pagination";
import Stories from "./Stories";

function App() {
  return (
    <div>
      <Search />
      <Pagination />
      <Stories />
    </div>
  );
}

export default App;
