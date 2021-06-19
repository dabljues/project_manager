import { Grid, Divider, Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components/macro";

const DetailEntryWrapper = (props: React.PropsWithChildren<any>) => {
  const { children } = props;

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
      {children}
    </Grid>
  );
};

interface ResponsiveColProps {
  justifyContent?: string;
}

const ResponsiveCol = styled(Grid)<ResponsiveColProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
`;

const Detail = styled(Grid)`
  font-size: 1.125rem;
`;

const DetailLabel = styled(ResponsiveCol)`
  font-weight: bold;
  font-size: 1.25em;
  justify-content: flex-end;

  @media (min-width: 600px) {
    justify-content: flex-start;
  }
`;

const DetailContent = styled(ResponsiveCol)``;

const EditButtonWrapper = styled(ResponsiveCol)`
  @media (min-width: 1200px) {
    justify-content: flex-end;
  }
`;

const DetailDivider = styled(Divider)`
  margin: 0.7rem 0;
`;

const DetailEntry = ({
  label,
  content,
  editName,
}: {
  label: string;
  content: string;
  editName: string;
}) => (
  <DetailEntryWrapper>
    <Detail container alignItems="center" justify="center" spacing={3}>
      <DetailLabel item xs={6} sm={3}>
        {label}
      </DetailLabel>
      <DetailContent item justifyContent="flex-start" xs={6} sm={5} xxl={6}>
        {content}
      </DetailContent>
      <EditButtonWrapper
        item
        justifyContent="flex-end"
        xs={12}
        sm={4}
        lg={4}
        xxl={3}
      >
        <Button color="primary" variant="contained" fullWidth>
          {editName}
        </Button>
      </EditButtonWrapper>
    </Detail>
    <DetailDivider />
  </DetailEntryWrapper>
);

export default DetailEntry;
