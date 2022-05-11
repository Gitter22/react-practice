import React, { useState, useEffect } from "react";
import "../../App.css";
import { Card } from "antd";
import ReactPaginate from "react-paginate";

const { Meta } = Card;

const ClientSidePagination = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

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
    setTimeout(() => {
      clientSide();
    }, 1000);
  }, []);

  const clientSide = () => {
    fetch("https://api.github.com/usrs?per_page=100", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  const displayUser = posts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="user" key={user.id}>
          <img src={user.avatar_url} height="150px" width="150px" alt="avtar" />
          <h2>{user.login}</h2>
        </div>
      );
    });
  const pageCount = Math.ceil(posts.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <Card>
        <Meta title="Client Side pagination" className="titleCard" />
      </Card>
      {error && <div className="dp">{error}</div>}
      {Loading && <div className="dp">Loading...</div>}
      {displayUser}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default ClientSidePagination;
