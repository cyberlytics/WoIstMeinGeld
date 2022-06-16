import { fireEvent, render, screen } from "@testing-library/react";
import AddGroupDialog from "../components/AddGroupDialog";
import { BrowserRouter as Router } from "react-router-dom";

describe("AddGroupDialog Component", () => {
    test("if dialog opens", () => {
        const result = render(
            <Router>
                <AddGroupDialog />
            </Router>
        );
        const button = result.getByTestId("openGroupDialogButton");
        fireEvent.click(button);

        expect(screen.getByRole("menu").getAttribute("open")).toBeTruthy;

        const newGroup = result.getByTestId("newGroup");
        fireEvent.click(newGroup);

        expect(screen.getByRole("dialog").getAttribute("open")).toBeTruthy;
    });
    test("if dialog buttons and inputfields", () => {
        const result = openDialog();

        const textfield = result.getByTestId("groupName");
        expect(textfield).toBeTruthy;

        const createButton = result.getByTestId("createGroup");
        expect(createButton).toBeTruthy;

        const cancelButton = result.getByTestId("cancelCreateGroup");
        expect(cancelButton).toBeTruthy;
    });
    test("if buttons and textfields are enabled", () => {
        const result = openDialog();

        const textfield = result.getByTestId("groupName");
        expect(textfield).toBeEnabled;

        const createButton = result.getByTestId("createGroup");
        expect(createButton).toBeEnabled;

        const cancelButton = result.getByTestId("cancelCreateGroup");
        expect(cancelButton).toBeEnabled;
    });
    test("if cancel button works", () => {
        const result = openDialog();

        const cancelButton = result.getByTestId("cancelCreateGroup");
        fireEvent.click(cancelButton);

        expect(screen.getByRole("dialog").getAttribute("open")).toBeFalsy;
    });
    test("if there is an error when groupname is empty", () => {
        const result = openDialog();

        const createButton = result.getByTestId("createGroup");
        fireEvent.click(createButton);

        expect(screen.getByRole("dialog").getAttribute("open")).toBeTruthy;
        expect(result.getByTestId("groupName").getAttribute("error")).toBeTruthy;
    });
});

function openDialog() {
    const result = render(
        <Router>
            <AddGroupDialog />
        </Router>
    );
    const button = result.getByTestId("openGroupDialogButton");
    fireEvent.click(button);
    const newGroup = result.getByTestId("newGroup");
    fireEvent.click(newGroup);

    return result;
}
