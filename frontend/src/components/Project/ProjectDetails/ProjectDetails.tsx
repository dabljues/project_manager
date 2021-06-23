import "./ProjectDetails.scss";

import DetailEntry from "components/shared/ProjectEntity/DetailEntry";

import { Avatar, createStyles, makeStyles } from "@material-ui/core";

import { UserData } from "../../../types";

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      marginRight: 15,
    },
  })
);
interface ProjectDetailsProps {
  owner: UserData;
  createdAt: string;
}

const ProjectDetails = (props: ProjectDetailsProps) => {
  const { owner, createdAt } = props;

  const classes = useStyles();

  const ownerAvatar = <Avatar src={owner.avatar} className={classes.avatar} />;
  const ownerName = `${owner.firstName} ${owner.lastName}`;

  return (
    <>
      <DetailEntry
        key="owner"
        label="Owner"
        content={ownerName}
        editName="Transfer ownership"
      />
      <DetailEntry
        key="created"
        label="Created"
        content={createdAt}
        editName="Delete project"
      />
    </>
  );
};

export default ProjectDetails;
