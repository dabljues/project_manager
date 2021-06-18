import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import * as S from "./Description.styles";

interface DescriptionProps {
  content: string;
  onSubmit?: (content: string) => Promise<boolean>;
  title?: string;
  rows?: number;
}

const Description = (props: DescriptionProps) => {
  const { content, onSubmit, title, rows } = props;
  const [descriptionContent, setDescriptionContent] = useState(content);
  const [expanded, setExpanded] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const editable = onSubmit !== undefined;

  useEffect(
    () => () => {
      setDescriptionContent("");
    },
    [content]
  );

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

  const descriptionTitle = (
    <>
      <S.DescriptionTitle>{title}</S.DescriptionTitle>
      {descriptionHeader}
    </>
  );

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {descriptionTitle}
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          multiline
          variant="outlined"
          value={descriptionContent}
          rows={rows}
          onFocus={editable ? () => setEditMode(true) : undefined}
          onBlur={editable ? () => setEditMode(false) : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            changeDescription(event.target.value)
          }
        />
        {/* {descriptionChanged && onSubmit !== undefined ? (
          <S.DescriptionEditActions>
            <Space size="middle">
              <S.SaveIcon
                onClick={async () => {
                  setDescriptionChanged(!(await onSubmit(descriptionContent)));
                }}
              />
              <S.CancelIcon onClick={() => resetDescription()} />
            </Space>
          </S.DescriptionEditActions>
        ) : null} */}
      </AccordionDetails>
    </Accordion>
  );
};

Description.defaultProps = {
  onSubmit: undefined,
  title: "Description",
  rows: 10,
};

export default Description;
