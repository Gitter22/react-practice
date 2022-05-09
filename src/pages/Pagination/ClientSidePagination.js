import React, { useState, useEffect } from "react";

const ClientSidePagination = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  console.log("dataa", posts);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    fetch("https://www.postman.com/collections/dca7d0ffbb60801a7f28")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  });

  return (
    <div className="container mt-t5">
      <h2 className="text-primary mb-3">ClientSidePagination</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.name} </p>
        </div>
      ))}
      <div>Page {pageNumber} </div>
      <div>
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
};

export default ClientSidePagination;
