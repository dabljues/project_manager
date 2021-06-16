import { Collapse, Input, Space, Table, Typography } from "antd";
import { authRequest } from "api/auth";
import ProjectDetails from "components/AD/Project/ProjectDetails";
import Description from "components/shared/AD/Description/Description";
import ProjectEntity from "components/shared/AD/ProjectEntity/ProjectEntity";
import StatusRow from "components/shared/AD/ProjectEntity/StatusRow";
import Spinner from "components/shared/Spinner";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ProjectData } from "types";

const { Title } = Typography;

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

interface ProjectADParams {
  projectName: string;
}

interface ProjectADProps extends RouteComponentProps<ProjectADParams> {}

const ProjectAD = ({ match }: ProjectADProps) => {
  const { projectName } = match.params;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  const authCommunicator = authRequest();

  useEffect(() => {
    let isMounted = true;
    const getProject = async () => {
      const projectData = await authCommunicator
        .get(`/project/${projectName}`)
        .then((response) => response.data);
      if (isMounted) {
        setProject(projectData);
        setLoading(false);
      }
    };
    getProject();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || project == null) {
    return <Spinner centered />;
  }

  const updateDescription = async (content: string): Promise<boolean> => {
    const r = await authCommunicator
      .patch(`/project/${project.name}/`, {
        description: content,
      })
      .then((response) => {
        setProject(response.data);
        return true;
      })
      .catch(() => false);
    return r;
  };

  return (
    <ProjectEntity name={projectName}>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <StatusRow status="Open" />
        <ProjectDetails project={project} />
        <Description
          content={project.description}
          onSubmit={updateDescription}
        />
        <Title level={2}>Participants:</Title>
        <Table dataSource={dataSource} columns={columns} />
      </Space>
    </ProjectEntity>
  );
};

export default ProjectAD;
