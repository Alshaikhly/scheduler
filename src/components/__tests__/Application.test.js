import React from "react";

import { render, cleanup, waitForElement, prettyDOM, getByText, getAllByTestId } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { getByText, container } = render(<Application />);
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]
      return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Monday"));
      expect(getByText("Archie Cohen")).toBeInTheDocument()
      console.log(prettyDOM(appointment));
    })
    })
    })
