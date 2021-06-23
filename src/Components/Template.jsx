import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from "react";

const Templates = (props) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [templateName, setTemplateName] = useState("");

  // CREATE A NEW TEMPLATE
  const showCreateFormToggle = () => {
    setShowCreateForm(!showCreateForm);
    setShowTemplateTask(false);
  };

  const nameHandler = (e) => {
    setTemplateName(e.target.value);
  };

  const createTemplate = async () => {
    const response = await fetch("http://localhost:5000/template/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: templateName,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      alert(data.errors[0].msg);
    } else {
      setTemplateName("");
      setShowCreateForm(false);
      getTemplates();
    }
  };

  // GET ALL TEMPLATES
  const [templates, setTemplates] = useState([]);

  const getTemplates = async () => {
    const response = await fetch("http://localhost:5000/templates", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTemplates(data);
  };
  useEffect(() => {
    getTemplates();
  }, []);

  // ADD TASK TO TEMPLATE
  const [showTemplateTask, setShowTemplateTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [templateId, setTemplateId] = useState("");

  const showTemplateTaskToggle = () => {
    setShowTemplateTask(!showTemplateTask);
    setShowCreateForm(false);
  };

  const descriptionHandler = (e) => {
    setTaskDescription(e.target.value);
  };

  const templateIdHandler = (e) => {
    const index = e.target.selectedIndex;
    const id = e.target.childNodes[index].id;
    setTemplateId(id);
  };

  const addTask = async () => {
    await fetch("http://localhost:5000/template/" + templateId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: taskDescription,
      }),
    });
    // TODO GET THE ID OF THE TEMPLATE TO ADD TEH TASK
    setShowTemplateTask(false);
    setTaskDescription("");
  };

  return (
    <div className="">
      <div className="d-flex justify-content-around">
        <Button className="bg-primary" onClick={showCreateFormToggle}>
          Create Template
        </Button>
        <Button className="bg-primary" onClick={showTemplateTaskToggle}>
          Add task to template
        </Button>
      </div>
      {showCreateForm ? (
        <Form className="mt-1">
          <FormGroup>
            <Label>Template Name</Label>
            <Input
              name="name"
              placeholder="enter template name"
              value={templateName}
              onChange={nameHandler}
            />
          </FormGroup>
          <Button className="mt-2 bg-success" onClick={createTemplate}>
            Create
          </Button>
        </Form>
      ) : null}
      {showTemplateTask ? (
        <Form className="mt-1">
          <FormGroup>
            <Label>Select template</Label>
            <Input type="select" name="select" onChange={templateIdHandler}>
              <option selected disabled>
                Select a template
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
          <FormGroup>
            <Label>Task description</Label>
            <Input
              name="description"
              value={taskDescription}
              onChange={descriptionHandler}
            />
          </FormGroup>
          <Button className="mt-1 bg-success" onClick={addTask}>
            Add
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default Templates;
