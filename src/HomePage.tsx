import { Typography } from "@material-ui/core";
import PageHeader from "./PageHeader";

const HomePage = () => (
  <div className="box">
    <PageHeader loggedIn={false} />
    <div className="page">
      <Typography variant="h1">Hi, someone</Typography>
    </div>
  </div>
);

export default HomePage;
