import { useState, useEffect } from "react";
import { Table } from "reactstrap";

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

  // DELETE TASK

  const deleteTask = async (e) => {};

  const udpateTask = async () => {
    const response = await fetch("http://localhost:5000/");
  };

  return (
    <div>
      {props.projects.map((project) => {
        return (
          <div>
            <h1>{project.name}</h1>
            {project.tasks.map((task) => {
              return (
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
                    <tr id={task._id}>
                      <td>{task.description}</td>
                      {task.completed ? <td> Done</td> : <td>In progress</td>}
                      <td>check</td>
                      <td
                        onClick={(e) => {
                          deleteTask(e);
                        }}
                      >
                        delete
                      </td>
                    </tr>
                  </tbody>
                </Table>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
