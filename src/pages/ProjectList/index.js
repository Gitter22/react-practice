import React from "react";
import { Card, Col, Divider, Row, Space, Tag } from "antd";
import projects from "../../projects";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ProjectList = () => {
  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <h3>Project List</h3>
          {projects.map((project) => (
            <Card style={{ marginTop: 16 }} key={project.id}>
              <Meta
                title={
                  <Link to={project.path}>
                    <h3>{project.title}</h3>
                  </Link>
                }
                description={project.objective}
              />
              <Row className="mt-3">
                {" "}
                <Col>
                  <span className="text-muted">Challenges: </span>{" "}
                  {project.challenges}
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <span className="text-muted">Libraries: </span>{" "}
                  <Space>
                    {project.libraries.map((library, index) => (
                      <Tag key={index}>{library}</Tag>
                    ))}
                  </Space>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <span className="text-muted">Tags: </span>{" "}
                  <Space>
                    {project.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </Space>
                </Col>
              </Row>
              <Row className="mt-2">
                <Divider />
                <Col span={8}>
                  Assigned To: {project.assignedTo}
                  <Divider type="vertical" />
                </Col>

                <Col span={8}>
                  Started At: {project.startedAt}
                  <Divider type="vertical" />
                </Col>

                <Col span={8}>Ended At: {project.endedAt}</Col>
              </Row>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ProjectList;
