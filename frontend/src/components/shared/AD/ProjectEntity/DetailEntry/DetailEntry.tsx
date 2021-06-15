import { Button, Divider } from "antd";
import styled from "styled-components/macro";

const DetailLabel = styled.div`
  display: flex;
  width: 200px;
  font-weight: bold;
  font-size: 1.25em;
`;

const DetailContent = styled.div`
  display: flex;
  flex: 1;
`;

const Detail = styled.div`
  display: flex;
  font-size: 1.25rem;
  align-items: center;
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
  <>
    <Detail>
      <DetailLabel>{label}</DetailLabel>
      <DetailContent>{content}</DetailContent>
      <Button type="primary">{editName}</Button>
    </Detail>
    <DetailDivider />
  </>
);

export default DetailEntry;
