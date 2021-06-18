import React, { useState } from "react";

import { Accordion, AccordionDetails, TextField } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import * as S from "./Description.styles";

interface DescriptionProps {
  content: string;
  onSave?: (content: string) => Promise<boolean>;
  title?: string;
  rows?: number;
}

const Description = (props: DescriptionProps) => {
  const { content, onSave, title, rows } = props;
  const [descriptionContent, setDescriptionContent] = useState(content);
  const [expanded, setExpanded] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const editable = onSave !== undefined;

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
    descriptionHeader = editMode ? <S.EditIcon /> : null;
  } else {
    descriptionHeader = (
      <S.DescriptionContentPreview>
        {contentPreview}...
      </S.DescriptionContentPreview>
    );
  }

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <S.DescriptionHeader expandIcon={<ExpandMoreIcon />}>
        <S.DescriptionTitle>{title}</S.DescriptionTitle>
        {descriptionHeader}
      </S.DescriptionHeader>
      <AccordionDetails>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          value={descriptionContent}
          rows={rows}
          onFocus={editable ? () => setEditMode(true) : undefined}
          onBlur={editable ? () => setEditMode(false) : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            changeDescription(event.target.value)
          }
        />
      </AccordionDetails>
      {descriptionChanged && onSave !== undefined ? (
        <S.DescriptionEditActions>
          <S.SaveIcon
            onClick={async () => {
              setDescriptionChanged(!(await onSave(descriptionContent)));
            }}
          />
          <S.CancelIcon onClick={() => resetDescription()} />
        </S.DescriptionEditActions>
      ) : null}
    </Accordion>
  );
};

Description.defaultProps = {
  onSave: undefined,
  title: "Description",
  rows: 10,
};

export default Description;
