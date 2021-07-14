import { Button, Typography } from "@material-ui/core";
import CreateTask from "components/Task/CreateTask";
import styled from "styled-components/macro";

const EmptyBacklog = styled(Typography)``;

const CreateTaskDialog = styled(CreateTask)`
  margin-top: 1rem;
`;

export { CreateTaskDialog, EmptyBacklog };
