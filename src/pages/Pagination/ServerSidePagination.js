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
  const [error, setError] = useState();

  const { Meta } = Card;
  var myHeaders = new Headers();

  myHeaders.append("Accept", "application/vnd.github.v3+json");
  myHeaders.append("Authorization", `token ${gittoken}`);

  var requestOptions = {
    headers: myHeaders,
  };

  const userUrl = `https://api.github.com/users?since=${pageNumber}&per_page=10`;

  let parsed = parse(`<${userUrl}>; rel="next", `);
  console.log("parsed header: ", parsed);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  const fetchUsers = async () => {
    setLoading(true);
    await fetch(userUrl, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data");
        }
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => setError(error));

    setLoading(false);
  };

  const searchHandler = (searchInput) => {
    if (searchInput !== "") {
      let serchedUser = userData.filter((user) => {
        return user.login.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0;
      });
      console.log("search", serchedUser);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong..</p>;
  }

  const handlePrev = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 10);
    }
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 10);
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
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={isSearched == false ? userData : searchResult}
            pagination={false}
          ></Table>
        </div>
        <div style={{ justifyContent: "center" }}>
          <div style={{ marginBottom: "50px" }}>
            <Button type="primary" onClick={handlePrev}>
              Prev
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
