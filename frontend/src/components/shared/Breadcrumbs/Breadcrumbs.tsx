import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import styled from "styled-components/macro";
import { Breadcrumbs as BC } from "@material-ui/core";

const Separator = styled.span`
  color: black;
  font-weight: bold;
`;

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  return (
    <BC separator={<Separator>{">"}</Separator>}>
      {breadcrumbs.map((value) => (
        <NavLink
          key={value.key}
          to={value.key}
          style={{ color: "snow", fontSize: "1rem" }}
        >
          {value.breadcrumb}
        </NavLink>
      ))}
    </BC>
  );
};
export default Breadcrumbs;
