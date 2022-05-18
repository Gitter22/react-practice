import { Alert, Avatar, Button, Input, Table, Spin, Anchor } from "antd";
import Search from "antd/lib/input/Search";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./ServerPagination.module.css";
const parse = require("parse-link-header");
const { Link } = Anchor;

const HVServerPagination = () => {
  const [userDataList, setUserDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchResult, setSearchResult] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [sinceParam, setSinceParam] = useState(0);
  const userUrl =
    process.env.REACT_APP_USER_API + `?since=${pageNumber}&per_page=${limit}`;
  const AuthToken = "token " + process.env.REACT_APP_TOKEN;

  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
    const fetchData = async () => {
      await axios
        .get(userUrl, {
          headers: {
            Authorization: AuthToken,
            Accept: "application/vnd.github.v3+json",
          },
        })
        .then((response) => {
          const parsed = parse(response.headers.link);
          setSinceParam(parsed.next.since);
          const userList = response.data.map((res) => {
            return {
              key: res.id,
              id: res.id,
              name: res.login,
              avatar_url: res.avatar_url,
              type: res.type,
              html_url: res.html_url,
            };
          });
          setUserDataList(userList);
          setIsLoaded(true);
          setIsError(false);
        })
        .catch((error) => {
          setErrorMessage(error);
          setIsError(true);
        });
    };
    fetchData();
    // setIsLoaded(true);
  }, [pageNumber]);

  const searchHandler = (event) => {
    let searchInput = event.currentTarget.value;
    if (searchInput !== "") {
      let FilteredResult = userDataList.filter((user) => {
        return user.name.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0;
      });
      setSearchResult(FilteredResult);
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url, data) => (
        <Fragment>
          <a href={data.html_url} target="_blank">
            <Avatar icon={<img src={avatar_url} />} />
          </a>
        </Fragment>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, data) => (
        <a href={data.html_url} target="_blank">
          <div>{data.name}</div>
        </a>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  const pageHandler = (page) => {
    setPageNumber(page);
  };

  const total = userDataList.length;
  const totalPages = Math.ceil(total / limit);
  let row = [];
  for (let page = 1; page <= totalPages; page++) {
    row.push(
      <Button
        onClick={(page) => {
          pageHandler(page);
        }}
      >
        {page}
      </Button>
    );
  }

  const firstHandler = () => {
    setPageNumber(0);
  };

  const nextHandler = () => {
    setPageNumber(sinceParam);
  };

  return (
    <Fragment>
      <Search
        className={classes.searchInput}
        placeholder="input search text"
        allowClear
        onChange={searchHandler}
      />
      <div className={classes.pageButtons}>
        <Button onClick={firstHandler}>First</Button>
        <Button onClick={nextHandler}>Next</Button>
      </div>
      {!isLoaded && (
        <Spin tip="Loading...">
          <Alert
            message="Please wait"
            description="waiting for data"
            type="info"
          />
        </Spin>
      )}
      {isError && <Alert message={errorMessage} type="error" />}
      {isLoaded && !isError && (
        <Table
          columns={columns}
          dataSource={isSearched == false ? userDataList : searchResult}
          pagination={false}
        />
      )}
      {/* <div>{row}</div> */}
    </Fragment>
  );
};

export default HVServerPagination;
