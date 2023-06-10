/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Checkbox } from "../components/Checkbox";

beforeEach(cleanup); // clean the DOM!

jest.mock("../firebase", () => ({
  // mock firebase module
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        // mock function collection
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders the task checkbox", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="yDLRSYdQsDmNJZT8i434"
          taskDesc="Finish this tutorial series!"
        /> //tu dong return checkBox
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy(); //so sanh voi gia tri true xem co dung k
    });

    it("renders the task checkbox and accepts a onClick", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="yDLRSYdQsDmNJZT8i434"
          taskDesc="Finish this tutorial series!"
        />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.click(queryByTestId("checkbox-action")); //xem co click duoc hay k
    });

    it("renders the task checkbox and accepts a onKeyDown", () => {
      const { queryByTestId } = render(
        <Checkbox
          id="yDLRSYdQsDmNJZT8i434"
          taskDesc="Finish this tutorial series!"
        />
      );
      expect(queryByTestId("checkbox-action")).toBeTruthy();
      fireEvent.keyDown(queryByTestId("checkbox-action"), {
        key: "a",
        code: 65,
      });
      fireEvent.keyDown(queryByTestId("checkbox-action"), {
        key: "Enter",
        code: 13,
      });
    });
  });
});
