import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import styled from "styled-components/macro";

const Separator = styled.span`
  color: black;
  font-weight: bold;
`;

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  return (
    <Breadcrumb separator={<Separator>{">"}</Separator>}>
      {breadcrumbs.map((value) => (
        <Breadcrumb.Item key={value.key}>
          <NavLink to={value.key} style={{ color: "snow", fontSize: "1rem" }}>
            {value.breadcrumb}
          </NavLink>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
export default Breadcrumbs;
