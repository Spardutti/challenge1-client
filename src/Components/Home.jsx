import { Container } from "reactstrap";
import Templates from "./Template";

const Home = (props) => {
  return (
    <Container>
      <h1 className="mt-5 text-center">Project Manager</h1>
      <hr />
      <Templates />
    </Container>
  );
};

export default Home;
