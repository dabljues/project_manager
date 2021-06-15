import { Button, Space, Tag } from "antd";
import styled from "styled-components/macro";

import { CheckCircleOutlined } from "@ant-design/icons";

const Status = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
`;

const StatusTag = styled.div`
  flex: 1;
  align-items: center;
`;

const StatusRow = ({ status }: { status: string }) => (
  <Status>
    <StatusTag>
      <Tag icon={<CheckCircleOutlined />} color="green">
        {status}
      </Tag>
    </StatusTag>
    <Space>
      <Button type="primary">In progress</Button>
      <Button type="primary">In review</Button>
      <Button type="primary">Done</Button>
      <Button type="primary">Close</Button>
    </Space>
  </Status>
);

export default StatusRow;
