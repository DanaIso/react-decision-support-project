import { React, useState } from "react";
import { Form, Input, Button } from "antd";

function DemoComponent(props) {
  const [name, setName] = useState("hejsan");

  const onFinish = (values) => {
    setName(values.name);
  };

  return (
    <div>
      <h1>{name}</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter your name here"></Input>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit you name</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DemoComponent;
