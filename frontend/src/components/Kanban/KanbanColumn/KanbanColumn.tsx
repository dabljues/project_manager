import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components/macro";
import { Grid } from "@material-ui/core";
import { ColumnData } from "types";
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

const KanbanColumn = (props: ColumnProps) => {
  const { col } = props;
  const { id, tasks } = col;

  return (
    <StyledGrid item xs={12} sm={3}>
      <Droppable droppableId={id}>
        {(provided) => (
          <StyledColumn>
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
