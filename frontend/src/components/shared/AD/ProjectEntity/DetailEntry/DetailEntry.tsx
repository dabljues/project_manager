import { Button, Col, Divider, Row } from "antd";
import React from "react";
import styled from "styled-components/macro";

const DetailEntryWrapper = (props: React.PropsWithChildren<any>) => {
  const { children } = props;

  return (
    <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
      {children}
    </Col>
  );
};

interface ResponsiveColProps {
  justifyContent?: string;
}

const ResponsiveCol = styled(Col)<ResponsiveColProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
`;

const Detail = styled(Row)`
  font-size: 1.125rem;
`;

const DetailLabel = styled(ResponsiveCol)`
  font-weight: bold;
  font-size: 1.25em;
  justify-content: flex-end;

  @media (min-width: 576px) {
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
    <Detail align="middle" justify="center" gutter={8}>
      <DetailLabel xs={12} sm={6}>
        {label}
      </DetailLabel>
      <DetailContent justifyContent="flex-start" xs={12} sm={10} xxl={12}>
        {content}
      </DetailContent>
      <EditButtonWrapper
        justifyContent="flex-end"
        xs={24}
        sm={8}
        lg={8}
        xxl={6}
      >
        <Button type="primary" block>
          {editName}
        </Button>
      </EditButtonWrapper>
    </Detail>
    <DetailDivider />
  </DetailEntryWrapper>
);

export default DetailEntry;
