import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components/macro";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import TaskData from "types/task";

interface TaskTileProps {
  task: TaskData;
  index: number;
}

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const TaskTile = (props: TaskTileProps) => {
  const { task, index } = props;
  const { name, title, assignee } = task;
  return (
    <Draggable draggableId={name} index={index}>
      {(provided) => (
        <StyledCard
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
        >
          <CardHeader title={<Link to={`/task/${name}`}>{name}</Link>} />
          <CardContent>
            {title} {assignee.firstName} {assignee.lastName}
          </CardContent>
        </StyledCard>
      )}
    </Draggable>
  );
};

export default TaskTile;
