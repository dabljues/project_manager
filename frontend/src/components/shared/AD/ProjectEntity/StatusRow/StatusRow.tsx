import { Button, Col, Grid, Row, Space, Tag } from "antd";
import styled from "styled-components/macro";

import { CheckCircleOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const Status = styled(Row)`
  margin-bottom: 4rem;
`;

const StatusTag = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin-bottom: 0;
  }
`;

const StatusButtons = styled(Col)``;

const StatusButtonsInRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StatusRow = ({ status }: { status: string }) => {
  const screens = useBreakpoint();
  const small = (screens.xs || screens.sm) && !screens.md;

  const buttons = (
    <>
      <Button type="primary" block={small}>
        In progress
      </Button>
      <Button type="primary" block={small}>
        In review
      </Button>
      <Button type="primary" block={small}>
        Done
      </Button>
      <Button type="primary" block={small}>
        Close
      </Button>
    </>
  );
  return (
    <Status align="middle">
      <StatusTag xs={24} sm={24} md={4}>
        <Tag icon={<CheckCircleOutlined />} color="green">
          {status}
        </Tag>
      </StatusTag>
      <StatusButtons xs={24} sm={24} md={20}>
        {small ? (
          <Row gutter={[8, 8]}>{buttons}</Row>
        ) : (
          <StatusButtonsInRow>
            <Space>{buttons}</Space>
          </StatusButtonsInRow>
        )}
      </StatusButtons>
    </Status>
  );
};

export default StatusRow;
