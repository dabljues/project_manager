import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components/macro";
import { Card, CardHeader, CardContent, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { TaskData } from "types/task";
import { TaskColors } from "models";

interface TaskTileProps {
  task: TaskData;
  index: number;
}

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const TileCover = styled.div`
  background-color: ${(p: { color: string }) => p.color};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 10px;
`;

const TaskTile = (props: TaskTileProps) => {
  const { task, index } = props;
  const { name, title, assignee, type } = task;
  return (
    <Draggable draggableId={name} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
        >
          <TileCover color={TaskColors[type]} />
          <StyledCard>
            <CardHeader
              title={<Link to={`/${task.project.name}/${name}`}>{name}</Link>}
              action={
                <Avatar src={assignee === null ? undefined : assignee.avatar} />
              }
            />
            <CardContent>{title}</CardContent>
          </StyledCard>
        </div>
      )}
    </Draggable>
  );
};

export default TaskTile;
