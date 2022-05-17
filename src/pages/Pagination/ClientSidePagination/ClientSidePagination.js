import React, { useState, useEffect, useCallback } from "react";
import classes from "./ClientSidePagination.module.css";
import { Card } from "antd";
import ReactPaginate from "react-paginate";

const githubAccessToken = process.env.REACT_APP_GITHUB_TOKEN;

const { Meta } = Card;

const ClientSidePagination = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isSearch, setIsSearch] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.github.v3+json");
  myHeaders.append("Authorization", `token ${githubAccessToken}`);

  var requestOptions = {
    headers: myHeaders,
  };

  const clientSide = useCallback(() => {
    setIsLoading(true);
    const result = fetch(
      "https://api.github.com/users?per_page=100",
      requestOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setSearchApiData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
    return result;
  }, []);

  useEffect(() => {
    clientSide();
  }, [clientSide]);

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setUsers(searchApiData);
    } else {
      const filterResult = searchApiData.filter((user) =>
        user.login.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log("filterResult", filterResult);
      if (filterResult.length > 0) {
        setUsers(filterResult);
      } else {
        setUsers([{ login: "No data found", id: "" }]);
      }
    }
    setIsSearch(e.target.value);
  };

  return (
    <div className={classes.main}>
      <Card>
        <Meta title="Client Side pagination" className={classes.titleCard} />
      </Card>
      {error && <div className={classes.dp}>{error}</div>}
      {isLoading && <div className={classes.dp}>Loading...</div>}
      <input
        type="text"
        placeholder="search"
        value={isSearch}
        onInput={(e) => handleFilter(e)}
      />
      {users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => {
        return (
          <div className={classes.user} key={user.id}>
            <img src={user.avatar_url} height="150px" width="150px" />
            <h2>{user.login}</h2>
          </div>
        );
      })}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={classes.paginationBttns}
        previousLinkClassName={classes.previousBttn}
        nextLinkClassName={classes.nextBttn}
        disabledClassName={classes.paginationDisabled}
        activeClassName={classes.paginationActive}
      />
    </div>
  );
};

export default ClientSidePagination;
