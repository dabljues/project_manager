import { authRequest } from "api/auth";
import {
  ChangeTitle,
  ChangeType,
  ChangeUser,
  DeleteEntity,
  DetailEntry,
} from "components/shared/ProjectEntity/DetailEntry";
import { useState } from "react";
import { Dictionary, TaskData, UserData } from "types";

import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TaskDetails = ({ task }: { task: TaskData }) => {
  const [taskData, setTaskData] = useState<TaskData>(task);
  const history = useHistory();
  const authCommunicator = authRequest();

  const changeTitle = async (title: string) => {
    const updatedTask = await authCommunicator.patch(`/task/${task.name}/`, {
      title,
    });
    setTaskData(updatedTask.data);
  };
  const changeType = async (type: string) => {
    const updatedTask = await authCommunicator.patch(`/task/${task.name}/`, {
      type,
    });
    setTaskData(updatedTask.data);
  };
  const changeOwner = async (owner: number) => {
    const updatedTask = await authCommunicator.patch(`/task/${task.name}/`, {
      owner,
    });
    setTaskData(updatedTask.data);
  };
  const changeAssignee = async (assignee: number) => {
    const updatedTask = await authCommunicator.patch(`/task/${task.name}/`, {
      assignee,
    });
    setTaskData(updatedTask.data);
  };
  const deleteTask = async () => {
    await authCommunicator.delete(`/task/${task.name}/`);
    history.push(`/project/${taskData.project.name}`);
  };

  const getParticipants = async (): Promise<UserData[]> => {
    const project = await authCommunicator.get(
      `/project/${taskData.project.name}`
    );
    return project.data.participants;
  };

  const typeMapping: Dictionary<string> = {
    Bug: "B",
    Improvement: "I",
    Task: "T",
  };

  return (
    <Grid container spacing={2}>
      <DetailEntry
        key="Title"
        label="Title"
        content={taskData.title}
        editDialog={
          <ChangeTitle value={taskData.title} onSubmit={changeTitle} />
        }
      />
      <DetailEntry
        key="Type"
        label="Type"
        content={taskData.type}
        editDialog={
          <ChangeType
            value={taskData.type}
            typeMapping={typeMapping}
            onSubmit={changeType}
          />
        }
      />
      <DetailEntry
        key="Owner"
        label="Owner"
        content={`${taskData.owner.firstName} ${taskData.owner.lastName}`}
        editDialog={
          <ChangeTitle
            value={taskData.owner.firstName}
            onSubmit={changeTitle}
          />
        }
      />
      <DetailEntry
        key="Assignee"
        label="Assignee"
        content={`${taskData.assignee.firstName} ${taskData.assignee.lastName}`}
        editDialog={
          <ChangeUser
            userType="assignee"
            currentUser={taskData.assignee}
            getAvailableUsers={getParticipants}
            onSubmit={changeAssignee}
          />
        }
      />
      <DetailEntry
        key="Created"
        label="Created"
        content={taskData.createdAt}
        editDialog={<DeleteEntity entityType="task" onSubmit={deleteTask} />}
      />
    </Grid>
  );
};

export default TaskDetails;
