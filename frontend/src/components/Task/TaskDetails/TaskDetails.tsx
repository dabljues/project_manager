import { authRequest } from "api/auth";
import ChangeTitle from "components/shared/ProjectEntity/ChangeTitle";
import ChangeType from "components/shared/ProjectEntity/ChangeType";
import DetailEntry from "components/shared/ProjectEntity/DetailEntry";
import ChangeAssignee from "components/shared/ProjectEntity/Task/ChangeAssignee";
import { useState } from "react";
import { Dictionary, TaskData } from "types";

import { Grid } from "@material-ui/core";

const TaskDetails = ({ task }: { task: TaskData }) => {
  const [taskData, setTaskData] = useState<TaskData>(task);
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
        key="Creator"
        label="Creator"
        content={`${taskData.creator.firstName} ${taskData.creator.lastName}`}
        editDialog={
          <ChangeTitle
            value={taskData.creator.firstName}
            onSubmit={changeTitle}
          />
        }
      />
      <DetailEntry
        key="Assignee"
        label="Assignee"
        content={`${taskData.assignee.firstName} ${taskData.assignee.lastName}`}
        editDialog={
          <ChangeAssignee task={taskData} onSubmit={changeAssignee} />
        }
      />
      <DetailEntry
        key="Created"
        label="Created"
        content={taskData.createdAt}
        editDialog={
          <ChangeTitle value={taskData.createdAt} onSubmit={changeTitle} />
        }
      />
    </Grid>
  );
};

export default TaskDetails;
