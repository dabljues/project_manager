import { Button } from "@material-ui/core";
import { useState } from "react";
import { authRequest } from "../../../api/auth";
import Dictionary from "../../../types/generic";
import StatusRow from "../../shared/ProjectEntity/StatusRow";

interface ProjectStatusProps {
  name: string;
  status: string;
}

interface StatusButtonMapping {
  buttonText: string;
  onClick: () => void;
}

const ProjectStatus = (props: ProjectStatusProps) => {
  const { name, status } = props;

  const [projectStatus, setProjectStatus] = useState(status);

  const authCommunicator = authRequest();

  const updateStatus = (newStatus: string) => {
    const update = async () => {
      await authCommunicator
        .patch(`/project/${name}/`, { status: newStatus })
        .then((response) => {
          setProjectStatus(response.data.status);
        });
    };
    update();
  };

  const mapping: Dictionary<StatusButtonMapping> = {
    Open: {
      buttonText: "Open",
      onClick: () => {
        updateStatus("O");
      },
    },
    Closed: {
      buttonText: "Close",
      onClick: () => {
        updateStatus("C");
      },
    },
  };

  return (
    <StatusRow status={projectStatus}>
      {Object.keys(mapping).map((statusButtonName, index) => {
        if (statusButtonName === projectStatus) {
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

export default ProjectStatus;
