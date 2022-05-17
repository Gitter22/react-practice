import React, { useState, useEffect } from "react";
import { Table, Card, Button } from "antd";
import Search from "antd/lib/input/Search";
import classes from "./ServerSidePagination.module.css";

var parse = require("parse-link-header");

const gittoken = process.env.REACT_APP_GITHUB_TOKEN;

const ServerSidePagination = () => {
  const [userData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sinceParam, setSinceParam] = useState(0);

  const { Meta } = Card;
  var myHeaders = new Headers();

  myHeaders.append("Accept", "application/vnd.github.v3+json");
  myHeaders.append("Authorization", `token ${gittoken}`);

  var requestOptions = {
    headers: myHeaders,
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  const fetchUsers = async () => {
    setLoading(true);
    await fetch(
      `https://api.github.com/users?since=${pageNumber}&per_page=10`,
      requestOptions
    )
      .then((res) => {
        let linkHeader = res.headers.get("link");
        const parsed = parse(linkHeader);
        setSinceParam(parsed.next.since);
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setError(null);
      })
      .catch((error) => setError(error.message));
    setLoading(false);
  };

  const searchHandler = (searchInput) => {
    if (searchInput !== "") {
      let serchedUser = userData.filter((user) => {
        return user.login.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0;
      });
      setSearchResult(serchedUser);
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  };

  useEffect(() => {}, [searchHandler]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "login",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "avatar_url",
      dataIndex: "avatar_url",
      render: (row) => <img src={row} alt="" height="100px" />,
      key: "image",
    },
  ];

  const handlePrev = () => {
    if (pageNumber > 0) {
      setSinceParam(0);
    }
  };
  const handleNext = () => {
    setPageNumber(sinceParam);
  };

  return (
    <>
      <Card>
        <Meta title="Server Side pagination" className={classes.title} />
      </Card>

      <Card style={{ height: "800px" }}>
        <Search
          placeholder="search user"
          allowClear
          onSearch={searchHandler}
          className={classes.search}
        />
        <div className={classes.table}>
          {loading ? (
            <p>Loading....</p>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table
              style={{ width: "500px" }}
              rowKey="id"
              columns={columns}
              dataSource={isSearched == false ? userData : searchResult}
              pagination={false}
            ></Table>
          )}
        </div>

        <div style={{ justifyContent: "center" }}>
          <div style={{ marginBottom: "50px" }}>
            <Button type="primary" onClick={handlePrev}>
              First
            </Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ServerSidePagination;
