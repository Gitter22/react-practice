import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";

const ServerSidePagination = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { Meta } = Card;
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
    fetchUsers(1);
  }, []);

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
      key: "url",
    },
  ];

  const fetchUsers = (page) => {
    setLoading(true);
    fetch(`https://api.github.com/users?page=${page}&size=5`, requestOptions)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => setError(error.message));

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
      </Card>
    </>
  );
};

export default ServerSidePagination;
