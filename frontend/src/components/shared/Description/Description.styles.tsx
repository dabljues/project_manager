import React from "react";
import styled, { css } from "styled-components/macro";

const DescriptionTitle = styled.span`
  font-size: 1.125em;
  margin-right: 1em;
  /* font-weight: bold; */
  /* font-style: italic; */
`;

// const DescriptionHeader = styled(Collapse.Panel)`
//   font-size: 1.125rem;
// `;

// const DescriptionContent = styled(TextArea)`
//   font-size: 1rem;
//   margin-bottom: 1rem;
// `;

const DescriptionContentPreview = styled.span`
  font-size: 0.8em;
`;

const ExpandIcon = ({
  isActive,
}: {
  isActive?: boolean | undefined;
}): React.ReactNode => (
  <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ fontSize: "1em" }} />
);

ExpandIcon.defaultProps = { isActive: undefined };

// const EditIcon = styled(EditOutlined)`
//   font-size: 1.125em;
// `;

const DescriptionEditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1em;
  margin-bottom: 0.5em;
  margin-top: 2.5em;
`;

const ClickableIcon = css`
  cursor: pointer;
  font-size: 2em;
`;

// const SaveIcon = styled(SaveOutlined)`
//   ${ClickableIcon}
// `;

// const CancelIcon = styled(ClearOutlined)`
//   ${ClickableIcon}
// `;

export {
  //   CancelIcon,
  //   DescriptionContent,
  DescriptionContentPreview,
  DescriptionEditActions,
  //   DescriptionHeader,
  DescriptionTitle,
  EditIcon,
  ExpandIcon,
  //   SaveIcon,
};
