import { Row } from "antd";
import DetailEntry from "components/shared/AD/ProjectEntity/DetailEntry";
import { ProjectData } from "types";

const ProjectDetails = ({ project }: { project: ProjectData }) => (
  <Row align="middle" gutter={32}>
    <DetailEntry
      label="Title"
      content={project.title}
      editName="Change title"
    />
    <DetailEntry
      label="Owner"
      content={`${project.owner.firstName} ${project.owner.lastName}`}
      editName="Transfer ownership"
    />
    <DetailEntry
      label="Created"
      content={project.createdAt}
      editName="Delete project"
    />
  </Row>
);

export default ProjectDetails;
