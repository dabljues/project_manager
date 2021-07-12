import "./ProjectDetails.scss";

import { authRequest } from "api/auth";
import { DetailEntry } from "components/shared/ProjectEntity/DetailEntry";
import ChangeTitle from "components/shared/ProjectEntity/DetailEntry/ChangeTitle";
import { useState } from "react";
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
  const authCommunicator = authRequest();
  const [projectData, setProjectData] = useState<ProjectData>(project);
  const changeTitle = async (title: string) => {
    const updatedProject = await authCommunicator.patch(
      `/project/${projectData.name}`,
      {
        title,
      }
    );
    setProjectData(updatedProject.data);
  };

  const classes = useStyles();

  const ownerAvatar = (
    <Avatar src={projectData.owner.avatar} className={classes.avatar} />
  );
  const ownerName = `${projectData.owner.firstName} ${projectData.owner.lastName}`;

  return (
    <Grid container spacing={2}>
      <DetailEntry
        key="owner"
        label="Owner"
        content={ownerName}
        editDialog={<ChangeTitle value={ownerName} onSubmit={changeTitle} />}
      />
      <DetailEntry
        key="created"
        label="Created"
        content={projectData.createdAt}
        editDialog={
          <ChangeTitle value={projectData.createdAt} onSubmit={changeTitle} />
        }
      />
    </Grid>
  );
};

export default ProjectDetails;
