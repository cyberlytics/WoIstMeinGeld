import { act, fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, test } from "vitest";
import DeleteGroupDialog from "../components/DeleteGroupDialog";

const groupId = 1;

describe("DeleteGroupDialog", () => {
    test("if dialog can open", async () => {
        const { container } = render(
            <Router>
                <DeleteGroupDialog groupId={groupId} />
            </Router>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        //check if dialog pops up
        expect(screen.getByRole("dialog").getAttribute("open")).toBeTruthy;
    });

    test("buttons are clickable", () => {
        const { container } = render(
            <Router>
                <DeleteGroupDialog groupId={groupId} />
            </Router>
        );
        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        expect(getByLabelText(menuItem, "deleteGroup")).toBeEnabled();
        expect(getByText(menuItem, "Abbrechen")).toBeEnabled();
    });

    test("if dialog closes on pressed Close button", async () => {
        const { container } = render(
            <Router>
                <DeleteGroupDialog groupId={groupId} />
            </Router>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        //close dialog
        const buttonEscape = getByText(menuItem, "Abbrechen");
        fireEvent.click(buttonEscape);

        expect(screen.getByRole("dialog").getAttribute("open")).toBeFalsy;
    });

    //TODO: resolve async problem in order to detect error message
    // test("if dialog shows an error when group has open repayments", async () => {
    //     const { container } = render(
    //         <Router>
    //             <DeleteGroupDialog groupId={groupId} />
    //         </Router>
    //     );

    //     const button = getByLabelText(container, "openDialogButton");
    //     fireEvent.click(button);

    //     // find the Home MenuItem
    //     const menuItem = screen.getByRole("dialog");

    //     //try to create new transaction
    //     const buttonCreate = getByLabelText(menuItem, "deleteGroup");

    //     act(() => {
    //         fireEvent.click(buttonCreate);
    //     });

    //     // check if error appears
    //     expect(await getByLabelText(menuItem, "errorMessage").getAttribute("error")).toBeTruthy();
    // });
});
