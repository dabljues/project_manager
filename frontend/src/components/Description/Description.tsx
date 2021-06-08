import "./Description.scss";

import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";

interface DescriptionProps {
  onChangeSubmit?: (content: string) => void;
  title?: string;
  content: string;
  rows?: number;
}

const Description = (props: DescriptionProps) => {
  const { onChangeSubmit, title, content, rows } = props;
  const [descriptionContent, setDescriptionContent] = useState(content);
  const [expanded, setExpanded] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);

  const editable = onChangeSubmit !== undefined;

  const resetDescription = () => {
    setDescriptionContent(content);
    setDescriptionChanged(false);
  };

  const changeDescription = (value: string) => {
    setDescriptionContent(value);
    setDescriptionChanged(true);
  };

  const contentPreview =
    descriptionContent.length >= 30
      ? descriptionContent.slice(0, 30)
      : descriptionContent;
  let descriptionHeader: JSX.Element | null;
  if (expanded) {
    descriptionHeader = editMode ? <EditIcon /> : null;
  } else {
    descriptionHeader = <Typography>{contentPreview}...</Typography>;
  }

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography style={{ fontWeight: "bold", marginRight: 20 }}>
          {title}
        </Typography>
        {descriptionHeader}
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          multiline
          variant="outlined"
          fullWidth
          value={descriptionContent}
          rows={rows}
          onFocus={editable ? () => setEditMode(true) : undefined}
          onBlur={editable ? () => setEditMode(false) : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            changeDescription(event.target.value)
          }
        />
      </AccordionDetails>
      {descriptionChanged && onChangeSubmit !== undefined ? (
        <div className="description-edit-actions">
          <IconButton onClick={() => onChangeSubmit(descriptionContent)}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => resetDescription()}>
            <ClearIcon />
          </IconButton>
        </div>
      ) : null}
    </Accordion>
  );
};

Description.defaultProps = {
  onChangeSubmit: undefined,
  title: "Description",
  rows: 10,
};

export default Description;
