import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components/macro";
import { ColumnData, Dictionary } from "types";

import { Grid, Typography } from "@material-ui/core";

import TaskTile from "../TaskTile";

interface ColumnProps {
  col: ColumnData;
}

const StyledGrid = styled(Grid)`
  display: flex;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  flex: 1 0 auto;
`;

const StyledList = styled.div`
  background-color: #ddd;
  border-radius: 0.8rem;
  padding: 1.5rem;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  margin-top: 1rem;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: ${(props) => props.theme.breakpoints.values.md}px) {
    display: none;
  }
`;

const KanbanColumn = (props: ColumnProps) => {
  const { col } = props;
  const { id, tasks } = col;

  const statusNameMapping: Dictionary<string> = {
    toDo: "To do",
    inProgress: "In progress",
    inReview: "In review",
    done: "Done",
  };

  return (
    <StyledGrid item xs={12} md={3}>
      <Droppable droppableId={id}>
        {(provided) => (
          <StyledColumn>
            <ColumnHeader>
              <Typography variant="h4">{statusNameMapping[id]}</Typography>
            </ColumnHeader>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <StyledList {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <TaskTile key={task.name} task={task} index={index} />
              ))}
              {provided.placeholder}
            </StyledList>
          </StyledColumn>
        )}
      </Droppable>
    </StyledGrid>
  );
};

export default KanbanColumn;
