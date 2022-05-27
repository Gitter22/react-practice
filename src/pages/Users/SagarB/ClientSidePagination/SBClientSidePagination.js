import { Spin, Alert, Table, Tag, Avatar, Button, Input } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./SBClientSidePagination.module.css";

const SBClientSidePagination = () => {
  const token = process.env.REACT_APP_TOKEN;
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const total_records = 100;
  const page_limit = 7;
  const base_url = process.env.REACT_APP_BASE_URL + total_records;
  const total_pages = Math.ceil(total_records / page_limit);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await axios
        .get(base_url, {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then((res) => {
          const response = res.data.map((user) => {
            return {
              key: user.id,
              id: user.id,
              avatar: user.avatar_url,
              name: user.login,
              type: user.type,
              user: user,
            };
          });
          setUserList(response);
        });
    }
    fetchData();
    setIsLoading(false);
  }, []);

  const pageNumber = (page=1) => {
    const start = (page - 1) * page_limit;
    const end = start + page_limit;
    const paginatedUsers = userList.slice(start, end);
    setPaginatedList(paginatedUsers);
  };

  useEffect(() => {
    pageNumber(currentPage);
  }, [userList, currentPage]);

  const PrevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      pageNumber(currentPage - 1);
    } else {
      pageNumber(1);
    }
  };

  const NextPageHandler = () => {
    if (currentPage < total_pages) {
      setCurrentPage(currentPage + 1);
      pageNumber(currentPage + 1);
    } else {
      pageNumber(total_pages);
    }
  };

  const SearchHandler = (event) => {
    var value = event.target.value;
    if (value === "") {
      pageNumber(1);
    } else {
      setPaginatedList(
        userList.filter((user) => {
          return user.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        })
      );
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
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <Avatar size="large" icon={<img src={text} alt="" />} />,
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => <a href={user.html_url} target="_blank"><div>{user.login}</div></a>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        let color = "volcano";
        if (text === "User") {
          color = "green";
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "block",
        width: "96rem",
        padding: 30,
      }}
    >
      <h4 style={{ fontSize: 30, fontFamily: "initial" }}>
        Client Side Pagination
      </h4>
      <div className={classes.pagination}>
        <div className={classes.pagination_div}>
          <Button onClick={PrevPageHandler}>Prev</Button>
          <Button className={classes.page_button}>
            Page {currentPage} of {total_pages}
          </Button>
          <Button onClick={NextPageHandler}>Next</Button>
        </div>
        <div className={classes["search-pagination"]}>
          <Input
            placeholder="Enter Page Number"
            allowClear
            onChange={(e) => {
              if (e.target.value <= total_pages && e.target.value > 0) {
                pageNumber(e.target.value);
                setCurrentPage(e.target.value);
              } else {
                pageNumber(1);
                setCurrentPage(1);
              }
            }}
          />
        </div>
        <div className={classes["search-bar"]}>
          <Input placeholder="Search..." allowClear onChange={SearchHandler} />
        </div>
      </div>
      {!isLoading && (
        <Table
          columns={columns}
          dataSource={paginatedList}
          pagination={false}
        />
      )}
      {isLoading && paginatedList && (
        <Spin tip="Loading...">
          <Alert
            message="Server not responding!!"
            description="Please refresh the page or wait!"
          />
        </Spin>
      )}
    </div>
  );
};

export default SBClientSidePagination;
