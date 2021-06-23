import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Projects = (props) => {
  // NEW PROJECT
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [projectName, setProjectName] = useState("");

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
    getTemplates();
  };

  const getTemplates = async () => {
    const response = await fetch("http://localhost:5000/templates", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTemplates(data);
  };

  const templateIdHandler = (e) => {
    const index = e.target.selectedIndex;
    const id = e.target.childNodes[index].id;
    setTemplateId(id);
  };

  const projectNameHandler = (e) => {
    setProjectName(e.target.value);
  };

  const createProject = async () => {
    const response = await fetch(
      "http://localhost:5000/project/new/" + templateId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
        }),
      }
    );
    setShowProjectForm(false);
    const data = await response.json();
    props.setProjects((old) => [...old, data]);
  };

  return (
    <div className="">
      <div className="d-flex justify-content-center">
        <Button className="bg-primary" onClick={toggleProjectForm}>
          Create project
        </Button>
      </div>
      {showProjectForm ? (
        <Form>
          <FormGroup>
            <Label>Project Name</Label>
            <Input value={projectName} onChange={projectNameHandler} />
          </FormGroup>
          <FormGroup>
            <Label>Template</Label>
            <Input type="select" onChange={templateIdHandler}>
              <option value="" disabled selected>
                {" "}
                Select template
              </option>
              {templates.map((template) => {
                return (
                  <option
                    value={template.name}
                    key={template._id}
                    id={template._id}
                  >
                    {template.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <Button className="bg-success mt-1" onClick={createProject}>
            Create
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default Projects;
