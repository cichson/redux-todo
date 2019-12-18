import React, { useState } from "react";
import { filter, mapTo } from "rxjs/operators";
//import logo from "./logo.svg";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Input,
  Popconfirm,
  Layout
} from "antd";
import uuid from "uuid";

import { tasks } from "./tasks/selectors";
import {
  addTaskAction,
  removeTaskAction,
  editTaskAction
} from "./tasks/actions";
import { ITask } from "./tasks/types";

const App: React.FC = () => {
  const [addTask, setAddTask] = useState(false);
  const [TaskName, setTaskName] = useState("");
  const [TaskId, setTaskId] = useState("");
  const [editTask, setEditTask] = useState(false);
  const dicts = useSelector(tasks);
  const dispatch = useDispatch();

  const handleAddTask = (event: React.MouseEvent<HTMLElement>) => {
    if (TaskName !== "") {
      dispatch(
        addTaskAction({
          id: uuid.v4(),
          name: TaskName
        })
      );
    }
    setAddTask(false);
    setTaskName("");
  };
  const handleEditTask = (event: React.MouseEvent<HTMLElement>) => {
    if (TaskName !== "") {
      dispatch(
        editTaskAction({
          id: TaskId,
          name: TaskName
        })
      );
    }
    setEditTask(false);
    setTaskName("");
  };

  const handleDeleteTask = (item: ITask) => {
    dispatch(removeTaskAction(item));
  };

  const ListHeaderComponent = (
    <Row type="flex" justify="space-between" align="middle">
      <Col span={8}>
        <Typography.Title level={2}>List of Tasks</Typography.Title>
      </Col>
      <Col span={4}>
        <Button style={{ float: "right" }} onClick={() => setAddTask(true)}>
          Add Task
        </Button>
        <Modal
          title="Add Task"
          visible={addTask}
          onCancel={() => setAddTask(false)}
          onOk={handleAddTask}
        >
          <Input
            placeholder="Task Name"
            value={TaskName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTaskName(event.target.value)
            }
          />
        </Modal>
        <Modal
          title="Edit Task"
          visible={editTask}
          onCancel={() => setEditTask(false)}
          onOk={handleEditTask}
        >
          <Input
            placeholder="Task Name"
            value={TaskName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTaskName(event.target.value);
            }}
          />
        </Modal>
      </Col>
    </Row>
  );

  return (
    <Layout>
      <Layout.Header>
        <Typography.Title style={{ textAlign: "center", color: "white" }}>
          TODO List
        </Typography.Title>
      </Layout.Header>
      <Layout.Content style={{ background: "white", padding: 25 }}>
        <React.Fragment>
          <Row type="flex" justify="center">
            <Col span={12}>
              <List
                bordered
                header={ListHeaderComponent}
                dataSource={dicts}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta title={item.name} />
                    <Button
                      type="primary"
                      size="small"
                      style={{ marginRight: 20 }}
                      onClick={() => {
                        setTaskId(item.id);
                        setTaskName(item.name);
                        setEditTask(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title={`Are you sure you want to delete the Task '${item.name}'`}
                      onConfirm={() => {
                        handleDeleteTask(item);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger" size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </React.Fragment>
      </Layout.Content>
    </Layout>
  );
};

export default App;
