import React, { useState, useEffect } from "react";
import { Layout, Card } from "antd";

const { Meta } = Card;

const ClientSidePagination = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [postNumber] = useState(5);
  console.log("dataa", posts);

  const currentPageNumber = pageNumber * postNumber - postNumber;
  const paginatedPosts = posts.splice(currentPageNumber, postNumber);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.github.v3+json");
  myHeaders.append(
    "Authorization",
    "token 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"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch("https://api.github.com/users?per_page=100", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div className="site-card-wrapper">
      <h2 className="text-primary mb-3">ClientSidePagination</h2>
      {paginatedPosts.map((post) => (
        <Card
          key={post.id}
          hoverable
          style={{ width: 240, marginTop: "30px" }}
          // cover={<img alt="example" src={post.avatar_url} />}
        >
          <h2> {post.login} </h2>
        </Card>
      ))}
      <div>Page {pageNumber} </div>
      <div style={{ marginBottom: "100px" }}>
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
};

export default ClientSidePagination;
