import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ColumnData } from "types";
import UserData from "types/userData";

import { AccordionDetails, Grid, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Column from "../KanbanColumn";
import * as S from "./KanbanRow.styles";

interface RowProps {
  initialColumns: {
    toDo: ColumnData;
    inReview: ColumnData;
    inProgress: ColumnData;
    done: ColumnData;
    [key: string]: ColumnData;
  };
  userData: UserData;
}

const KanbanRow = (props: RowProps) => {
  const { initialColumns, userData } = props;
  const [columns, setColumns] = useState(initialColumns);
  const [expanded, setExpanded] = useState(true);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start.id === end.id) {
      const newTasks = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index
      );

      newTasks.splice(destination.index, 0, start.tasks[source.index]);
      start.tasks = newTasks;

      setColumns((state) => ({ ...state, [start.id]: start }));
      return null;
    }
    const newStartTasks = start.tasks.filter(
      (_: any, idx: number) => idx !== source.index
    );

    end.tasks.splice(destination.index, 0, start.tasks[source.index]);
    start.tasks = newStartTasks;

    setColumns((state) => ({
      ...state,
      [start.id]: start,
      [end.id]: end,
    }));
    return null;
  };

  const rowHeader = (
    <>
      <Typography variant="h5">
        {userData.firstName} {userData.lastName}
      </Typography>
      {expanded ? null : <S.KanbanRowAvatar src={userData.avatar} />}
    </>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <S.AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {rowHeader}
        </S.AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {Object.values(columns).map((column) => (
              <Column col={column} key={column.id} />
            ))}
          </Grid>
        </AccordionDetails>
      </S.Accordion>
    </DragDropContext>
  );
};

export default KanbanRow;
