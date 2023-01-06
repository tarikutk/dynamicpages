import React from "react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import Home from "../../pages/index";
const info = {
  title: "Calculator/HomePage",
  component: Home,
  parameters: {
  },
};
export default info;
const Template = (args) => <Home {...args}/>;

export const Default = Template.bind({});
Default.parameters = {
    theme: 'dark',
  }

export const passParams = Template.bind({});
passParams.args = {
    operation: 'multiply',
    first: '2',
    second: '2'
  }
export const InteractiveTest = Template.bind({});
InteractiveTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form");
  await userEvent.type(form.querySelector("#first"), "1");
  await userEvent.type(form.querySelector("#second"), "2");
  await userEvent.selectOptions(form.querySelector("#operation"), ["add"]);

  await userEvent.click(canvas.getByRole("button"));

  await waitFor(() => {
    expect(canvasElement.querySelector("#result").innerText).toBe("3");
    //  expect(canvas.getByRole('alert')).toBeInTheDocument()});
    // expect(canvas.getByText('first cannot be empty')).toBeInTheDocument()
  });


};