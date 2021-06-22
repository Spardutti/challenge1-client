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
    }
  };

  // GET ALL TEMPLATES
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5000/templates", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTemplates(data);
    })();
  }, []);

  // ADD TASK TO TEMPLATE
  const [showTemplateTask, setShowTemplateTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskId, setTaskId] = useState("");

  const showTemplateTaskToggle = () => {
    setShowTemplateTask(!showTemplateTask);
    setShowCreateForm(false);
  };

  const descriptionHandler = (e) => {
    setTaskDescription(e.target.value);
  };

  const taskIdHandler = (e) => {
    setTaskId(e.target.id);
  };

  const addTask = async () => {
    const response = await fetch("http://localhost:5000/template" + taskId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: taskDescription,
      }),
    });
    const data = await response.json();
    console.log(data);
    setShowTemplateTask(false);
  };

  return (
    <div>
      <Button className="bg-primary mx-5" onClick={showCreateFormToggle}>
        Create Template
      </Button>
      <Button className="bg-primary" onClick={showTemplateTaskToggle}>
        Add task to template
      </Button>
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
            <Input type="select" name="select">
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
