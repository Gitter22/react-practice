import React, { useState, useEffect } from "react";
import { Table } from "antd";

const ServerSidePagination = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    fetchUsers(2);
  }, []);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "login",
      dataIndex: "login",
    },
  ];

  const fetchUsers = (page) => {
    setLoading(true);
    fetch(`https://api.github.com/users?page=${page}&size=5`, requestOptions)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.log("error", error));
    setLoading(false);
  };
  return (
    <>
      <div>Server Side Pagination</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table
          loading={loading}
          columns={columns}
          dataSource={userData}
          pagination={{
            pageSize: 5,

            onChange: (page) => {
              fetchUsers(page);
            },
          }}
        ></Table>
      </div>
    </>
  );
};

export default ServerSidePagination;
