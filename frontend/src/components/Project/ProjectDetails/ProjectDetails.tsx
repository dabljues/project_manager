import { authRequest } from "api/auth";
import {
  ChangeUser,
  DeleteEntity,
  DetailEntry,
} from "components/shared/ProjectEntity/DetailEntry";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserData } from "types";
import ProjectData from "types/project";

import { Avatar, createStyles, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      marginRight: 15,
    },
  })
);
interface ProjectDetailsProps {
  project: ProjectData;
}

const ProjectDetails = (props: ProjectDetailsProps) => {
  const { project } = props;
  const [projectData, setProjectData] = useState<ProjectData>(project);
  const history = useHistory();
  const authCommunicator = authRequest();

  const changeOwner = async (owner: number) => {
    const updatedProject = await authCommunicator.patch(
      `/project/${projectData.name}/`,
      {
        owner,
      }
    );
    setProjectData(updatedProject.data);
  };
  const deleteProject = async () => {
    await authCommunicator.delete(`/project/${projectData.name}/`);
    history.push("/projects");
  };

  const getParticipants = async (): Promise<UserData[]> => {
    const projectResponse = await authCommunicator.get(
      `/project/${projectData.name}`
    );
    return projectResponse.data.participants;
  };

  const classes = useStyles();

  const ownerAvatar = (
    <Avatar
      src={projectData.owner === null ? undefined : projectData.owner.avatar}
      className={classes.avatar}
    />
  );
  const ownerName =
    projectData.owner === null
      ? "No owner"
      : `${projectData.owner.firstName} ${projectData.owner.lastName}`;

  return (
    <Grid container spacing={2}>
      <DetailEntry
        key="owner"
        label="Owner"
        content={ownerName}
        editDialog={
          <ChangeUser
            userType="owner"
            currentUser={projectData.owner}
            getAvailableUsers={getParticipants}
            onSubmit={changeOwner}
          />
        }
      />
      <DetailEntry
        key="created"
        label="Created"
        content={projectData.createdAt}
        editDialog={
          <DeleteEntity entityType="project" onSubmit={deleteProject} />
        }
      />
    </Grid>
  );
};

export default ProjectDetails;
