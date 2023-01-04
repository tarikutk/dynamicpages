import React from "react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import Home from "../../pages/index";
const info = {
  title: "Calculator/HomePage",
  component: Home,
  parameters: {
  //   mockData: [
  //     {
  //         url: '/api/calculate/add/1/2',
  //         method: 'GET',
  //         status: 200,
  //         response: (request) => {
  //           const { body, searchParams } = request;
  //           console.log('the requesst----------------', {request, body, searchParams});

  //           return {
  //               result: 3
  //           }
  //         }
  //     }
  // ],
  },
};
export default info;
const Template = (args) => <Home {...args}/>;

export const Default = Template.bind({});
Default.parameters = {
    theme: 'dark',
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
  });
};