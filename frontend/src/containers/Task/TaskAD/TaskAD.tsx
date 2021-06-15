import { Collapse, Input, Space, Table, Typography } from "antd";
import { authRequest } from "api/auth";
import TaskDetails from "components/AD/Task/TaskDetails";
import Description from "components/shared/AD/Description/Description";
import ProjectEntity from "components/shared/AD/ProjectEntity/ProjectEntity";
import StatusRow from "components/shared/AD/ProjectEntity/StatusRow";
import Spinner from "components/shared/Spinner";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TaskData } from "types";

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

interface TaskADParams {
  taskName: string;
}

interface TaskADProps extends RouteComponentProps<TaskADParams> {}

const TaskAD = ({ match }: TaskADProps) => {
  const { taskName } = match.params;
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);

  const authCommunicator = authRequest();

  useEffect(() => {
    let isMounted = true;
    const getTask = async () => {
      const taskData = await authCommunicator
        .get(`/task/${taskName}`)
        .then((response) => response.data);
      if (isMounted) {
        setTask(taskData);
        setLoading(false);
      }
    };
    getTask();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || task == null) {
    return <Spinner centered />;
  }

  const updateDescription = async (content: string): Promise<boolean> => {
    const r = await authCommunicator
      .patch(`/task/${task.name}/`, {
        description: content,
      })
      .then((response) => {
        setTask(response.data);
        return true;
      })
      .catch(() => false);
    return r;
  };

  return (
    <ProjectEntity name={taskName}>
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <StatusRow status="Open" />
        <TaskDetails task={task} />
        <Description content={task.description} onSubmit={updateDescription} />
        <Title level={2}>Subtasks:</Title>
        <Table dataSource={dataSource} columns={columns} />
      </Space>
    </ProjectEntity>
  );
};

export default TaskAD;
