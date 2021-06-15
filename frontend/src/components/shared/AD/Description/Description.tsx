import { Collapse, Space } from "antd";
import React, { useEffect, useState } from "react";

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
    <Collapse
      defaultActiveKey={["desc"]}
      expandIcon={S.ExpandIcon}
      onChange={() => setExpanded(!expanded)}
    >
      <S.DescriptionHeader header={descriptionTitle} key="desc">
        <S.DescriptionContent
          showCount
          maxLength={3000}
          value={descriptionContent}
          rows={rows}
          onFocus={editable ? () => setEditMode(true) : undefined}
          onBlur={editable ? () => setEditMode(false) : undefined}
          onChange={(event): void => changeDescription(event.target.value)}
        />
        {descriptionChanged && onSubmit !== undefined ? (
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
        ) : null}
      </S.DescriptionHeader>
    </Collapse>
  );
};

Description.defaultProps = {
  onSubmit: undefined,
  title: "Description",
  rows: 10,
};

export default Description;
