import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";

const CreateTaskForm = (props) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [projectId, setProjectId] = useState("");

  const taskDescriptionHandler = (e) => {
    setTaskDescription(e.target.value);
  };

  const addTask = async () => {
    await fetch("http://localhost:5000/project/task/" + projectId, {
      method: "POST",
      body: JSON.stringify({
        description: taskDescription,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setTaskDescription("");
    setShowTaskForm(false);
    props.getAllProjects();
  };

  const toggleTaskForm = (e) => {
    setShowTaskForm(!showTaskForm);
    setProjectId(props.project);
  };

  return (
    <div>
      <Button
        className="bg-primary"
        onClick={(e) => {
          toggleTaskForm(e);
        }}
      >
        Add task
      </Button>
      {showTaskForm ? (
        <Form>
          <FormGroup>
            <Label>Task description</Label>
            <Input value={taskDescription} onChange={taskDescriptionHandler} />
          </FormGroup>
          <Button onClick={addTask} className="bg-success mt-1">
            Add
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default CreateTaskForm;
