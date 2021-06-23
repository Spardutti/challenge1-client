import { Container } from "reactstrap";
import Templates from "./Template";
import CreateProject from "./CreateProject";
import Projects from "./Projects";
import { useState } from "react";

const Home = (props) => {
  const [projects, setProjects] = useState([]);
  return (
    <Container>
      <h1 className="mt-5 text-center">Project Manager</h1>
      <hr />
      <Templates />
      <hr />
      <CreateProject setProjects={setProjects} projects={projects} />
      <hr />
      <Projects projects={projects} setProjects={setProjects} />
    </Container>
  );
};

export default Home;
