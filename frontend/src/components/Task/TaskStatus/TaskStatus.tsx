import StatusRow from "components/shared/ProjectEntity/StatusRow";
import { useState } from "react";

import { Button } from "@material-ui/core";

import { authRequest } from "../../../api/auth";
import Dictionary from "../../../types/generic";

interface TaskStatusProps {
  name: string;
  status: string;
}

interface StatusButtonMapping {
  buttonText: string;
  onClick: () => void;
}

const TaskStatus = (props: TaskStatusProps) => {
  const { name, status } = props;

  const [taskStatus, setTaskStatus] = useState(status);

  const authCommunicator = authRequest();

  const updateStatus = (newStatus: string) => {
    const update = async () => {
      await authCommunicator
        .patch(`/task/${name}/`, { status: newStatus })
        .then((response) => {
          setTaskStatus(response.data.status);
        });
    };
    update();
  };

  const mapping: Dictionary<StatusButtonMapping> = {
    New: {
      buttonText: "New",
      onClick: () => {
        updateStatus("NW");
      },
    },
    "To do": {
      buttonText: "To do",
      onClick: () => {
        updateStatus("TD");
      },
    },
    "In progress": {
      buttonText: "In progress",
      onClick: () => {
        updateStatus("IP");
      },
    },
    "In review": {
      buttonText: "In review",
      onClick: () => {
        updateStatus("IR");
      },
    },
    Done: {
      buttonText: "Done",
      onClick: () => {
        updateStatus("DN");
      },
    },
    Rejected: {
      buttonText: "Close",
      onClick: () => {
        updateStatus("RJ");
      },
    },
  };

  return (
    <StatusRow status={taskStatus}>
      {Object.keys(mapping).map((statusButtonName, index) => {
        if (statusButtonName === taskStatus) {
          return null;
        }
        return (
          <Button
            onClick={mapping[statusButtonName].onClick}
            key={statusButtonName}
          >
            {mapping[statusButtonName].buttonText}
          </Button>
        );
      })}
    </StatusRow>
  );
};

export default TaskStatus;
