import { useState, useEffect } from "react";
import { Table, Button, Form, FormGroup, Input, Label } from "reactstrap";
import CreateTaskForm from "./CreateTaskForm";

const Projects = (props) => {
  // GET PROJECTS
  const getAllProjects = async () => {
    const response = await fetch("http://localhost:5000/projects", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    props.setProjects(data);
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  // ADD TASK

  // DELETE TASK

  const deleteTask = async (e) => {
    let index = e.target.parentNode.parentNode.getAttribute("data-index");
    let id = e.target.parentNode.parentNode.id;
    await fetch("http://localhost:5000/project/delete/" + id, {
      method: "DELETE",
      body: JSON.stringify({
        index,
      }),
    });
    getAllProjects();
  };

  // UPDATE TASK
  const udpateTask = async (e) => {
    let id = e.target.parentNode.id;
    let index = e.target.parentNode.getAttribute("data-index");

    await fetch("http://localhost:5000/project/update/" + id, {
      method: "PUT",
      body: JSON.stringify({
        index,
      }),
      headers: { "Content-Type": "application/json" },
    });
    getAllProjects();
  };

  const deleteProject = async (e) => {
    let id = e.target.getAttribute("data-projectid");
    await fetch("http://localhost:5000/project/" + id, {
      method: "DELETE",
    });
    getAllProjects();
  };

  return (
    <div>
      {props.projects.map((project) => {
        return (
          <div key={project._id}>
            <h1>{project.name}</h1>
            <div className="d-flex justify-content-around">
              <CreateTaskForm
                getAllProjects={getAllProjects}
                project={project._id}
              />
              <Button
                data-projectid={project._id}
                className="bg-danger"
                onClick={(e) => {
                  deleteProject(e);
                }}
              >
                Delete Project
              </Button>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Task description</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map((task, index) => {
                  return (
                    <tr id={project._id} data-index={index} key={task._id}>
                      <td>{task.description}</td>
                      {task.completed ? (
                        <td>
                          {" "}
                          <i className="fas fa-check"></i>
                        </td>
                      ) : (
                        <td>
                          <i className="fas fa-times-circle"></i>
                        </td>
                      )}
                      <td
                        onClick={(e) => {
                          udpateTask(e);
                        }}
                      >
                        check
                      </td>
                      <td
                        onClick={(e) => {
                          deleteTask(e);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
