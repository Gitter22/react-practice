import React from "react";
import { Avatar, Card, Col, Divider, List, Row, Space, Tag, Collapse } from "antd";
import projects from "../../projects";
import { Link } from "react-router-dom";
import users from "../../users";


const { Meta } = Card;
const { Panel } = Collapse

const Users = () => {
  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <h5>React Trainees</h5>
          {users.map((user) => (
            <Card style={{ marginTop: 16 }} key={user.id}>
              <Row>
                <Space>
                  <Col>
                    <Avatar
                      style={{ color: '#FFFFFF', backgroundColor: '#87d068' }}
                      size="large"
                    >
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </Avatar>
                  </Col>
                  <Col>
                    <h3>{user.firstName} {user.lastName}</h3>
                  </Col>
                </Space>
              </Row>
              <Row className="mt-1">
                <Col span={24}>
                  <strong>Projects: </strong>
                  <Collapse accordion style={{ width: "100%" }}>
                    {user.projects.map(userProject => {
                      const foundProject = projects.find(project => project.id === userProject.projectId)
                      if (foundProject) {
                        return (
                          <Panel header={foundProject.title} key={userProject.id}>
                            <p>{foundProject.objective}</p>

                            <Row className="mt-1">
                              <Col>
                                <span className="text-muted">Libraries: </span>{" "}
                                <Space>
                                  {foundProject.libraries.map((library, index) => (
                                    <Tag key={index}>{library}</Tag>
                                  ))}
                                </Space>
                              </Col>
                            </Row>
                            <Row className="mt-1">
                              <Col>
                                <span className="text-muted">Tags: </span>{" "}
                                <Space>
                                  {foundProject.tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                  ))}
                                </Space>
                              </Col>
                            </Row>
                            <p><Link to={`${user.pathPrefix}${userProject.path}`}>Go to Project</Link></p>
                          </Panel>)
                      } else return null
                    })}
                  </Collapse>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Users;
