import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";

// var parse = require("parse-link-header");

const gittoken = process.env.REACT_APP_GITHUB_TOKEN;

const ServerSidePagination = () => {
  const [userData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handlePrev = () => {
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  const { Meta } = Card;
  var myHeaders = new Headers();

  myHeaders.append("Accept", "application/vnd.github.v3+json");
  myHeaders.append("Authorization", `token ${gittoken}`);

  var requestOptions = {
    headers: myHeaders,
  };

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
      render: (row) => <img src={row} alt="" height="150px" />,
      key: "image",
    },
  ];

  // var linkHeader =
  //   `<https://api.github.com/users?since=${pageNumber}&per_page=5>; rel="next", ` +
  //   `<https://api.github.com/users?since=${pageNumber}&per_page=5>; rel="prev", `;

  // var parsed = parse(linkHeader);
  // console.log(parsed);

  const fetchUsers = async () => {
    setLoading(true);
    await fetch(
      `https://api.github.com/users?since=${pageNumber}&per_page=5`,
      requestOptions
    )
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong..</p>;
  }

  return (
    <>
      <Card>
        <Meta
          title="Server Side pagination"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Card>
      <Card style={{ height: "800px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={userData}
            pagination={false}
          ></Table>
        </div>
        <div>Page {pageNumber} </div>
        <div style={{ marginBottom: "50px" }}>
          <button onClick={handlePrev}>prev</button>
          <button onClick={handleNext}>next</button>
        </div>
      </Card>
    </>
  );
};

export default ServerSidePagination;
