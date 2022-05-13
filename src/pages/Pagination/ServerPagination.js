import { Avatar, Button, Table } from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import classes from "./ServerPagination.module.css";

const ServerPagination = () => {
  const [userDataList, setUserDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const userUrl =
    process.env.REACT_APP_USER_API + `?since=${pageNumber}&per_page=${10}`;
  const AuthToken = "token" + process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(userUrl, { headers: { Authorization: AuthToken } })
        .then((response) => {
          const userList = response.data.map((res) => {
            return {
              id: res.id,
              name: res.login,
              avatar_url: res.avatar_url,
              type: res.type,
            };
          });
          setUserDataList(userList);
        });
    };
    fetchData();
    console.log("useeffect");
  }, [pageNumber]);

  console.log("userDataList: ", userDataList);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url) => (
        <Fragment>
          {console.log("avatar_url: ", avatar_url)}
          <Avatar icon={<img src={avatar_url} />} />
        </Fragment>
      ),
    },
  ];

  const pageHandler = (page) => {
    setPageNumber(page);
  };

  const total = userDataList.length;
  const totalPages = Math.ceil(total / 10);
  let row = [];
  for (let page = 1; page <= totalPages; page++) {
    // console.log("page: ", page);
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
  // console.log("row: ", row);

  const prevHandler = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 10);
    }
  };

  const nextHandler = () => {
    setPageNumber(pageNumber + 10);
  };

  return (
    <Fragment>
      <Table columns={columns} dataSource={userDataList} pagination={false} />
      {/* <div>{row}</div> */}
      <div className={classes.pageButtons}>
        <Button onClick={prevHandler}>Prev</Button>
        <Button onClick={nextHandler}>Next</Button>
      </div>
    </Fragment>
  );
};

export default ServerPagination;
