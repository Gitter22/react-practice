import { Table } from "antd";
import axios from "axios";
import { Button } from "bootstrap";
import React, { Fragment, useEffect, useState } from "react";

const ServerPagination = () => {
  const [userDataList, setUserDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const userUrl =
    process.env.REACT_APP_USER_API + `?since=${pageNumber}&per_page=${10}`;

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(userUrl).then((response) => {
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
      dataIndex: "avatar",
      key: "avatar",
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
      <button
        onClick={(page) => {
          pageHandler(page);
        }}
      >
        {page}
      </button>
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
      <Table columns={columns} dataSource={userDataList} />
      {/* <input onChange={(e) => pageHandler(e.target.value)}></input> */}
      {/* <div>{row}</div> */}
      {/* <div>{row}</div> */}
      <button onClick={prevHandler}>Prev</button>
      <button onClick={nextHandler}>Next</button>
    </Fragment>
  );
};

export default ServerPagination;
