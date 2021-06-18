import React from "react";
import styled, { css } from "styled-components/macro";

import { Edit, Save, Clear } from "@material-ui/icons";
import {
  AccordionSummary,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      display: "flex",
      alignItems: "center",
    },
  })
);
const DescriptionTitle = styled(Typography)`
  font-size: 1.25rem;
  margin-right: 1em;
`;

const DescriptionHeader = (props: React.PropsWithChildren<any>) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AccordionSummary {...rest} classes={{ content: classes.content }}>
      {children}
    </AccordionSummary>
  );
};

const DescriptionContentPreview = styled(Typography)`
  font-size: 1.1rem;
  color: gray;
`;

const EditIcon = styled(Edit)`
  font-size: 1.125em;
`;

const DescriptionEditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1em;
  margin-bottom: 0.5em;
`;

const ClickableIcon = css`
  cursor: pointer;
  font-size: 2em;
`;

const SaveIcon = styled(Save)`
  ${ClickableIcon}
`;

const CancelIcon = styled(Clear)`
  ${ClickableIcon}
`;

export {
  CancelIcon,
  DescriptionContentPreview,
  DescriptionEditActions,
  DescriptionHeader,
  DescriptionTitle,
  EditIcon,
  SaveIcon,
};
