import { fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AddGroupDialog from "../components/AddGroupDialog";
import { BrowserRouter as Router } from "react-router-dom";
import { GroupList } from "../components/GroupList";

describe("RemoveFromGroup", () => {
    test("if three-point-menu opens with all necessary options in GroupScreen", async () => {
        const result = render(
            <Router>
                <GroupList />
            </Router>
        );

        //gets all groups from mocked server and checks for name
        const groupListItems = result.getAllByTestId("groupListItem");
        expect(groupListItems[0]).toHaveAccessibleName("Gruppe 1");
        // fireEvent.click(groupListItems[0]);

        // //check if Selection pops up
        // const menuSelection = screen.getByRole("menu");
        // expect(menuSelection.getAttribute("open")).toBeTruthy;

        // // open the join Group Dialog
        // const buttonOpenJoin = screen.getAllByRole("menuitem");
        // fireEvent.click(buttonOpenJoin[1]);

        // //check if it is open
        // const joinGroupDialog = screen.getByRole("dialog");
        // expect(joinGroupDialog.getAttribute("openJoin")).toBeTruthy;

        // const buttons = screen.getAllByRole("button");
        // console.log(buttons);
        // console.log(buttons.length);

        // // make sure it was rendered
        // expect(await getByTestId(joinGroupDialog, "groupnameJoin")).toBeTruthy();
        // expect(await buttons[0]).toBeTruthy();
        // expect(await buttons[0]).toHaveTextContent("Gruppe beitreten");
        // expect(await buttons[1]).toBeTruthy();
        // expect(await buttons[1]).toHaveTextContent("Abbrechen");
    });

    // test("buttons are clickable", async () => {
    //     const result = render(
    //         <Router>
    //             <AddGroupDialog />
    //         </Router>
    //     );

    //     //opens Selection for joining group odr creating a new one
    //     const buttonOpenSelection = result.getByLabelText("openGroupDialogButton");
    //     fireEvent.click(buttonOpenSelection);

    //     //check if Selection pops up
    //     const menuSelection = screen.getByRole("menu");
    //     expect(menuSelection.getAttribute("open")).toBeTruthy;

    //     // open the join Group Dialog
    //     const buttonOpenJoin = screen.getAllByRole("menuitem");
    //     fireEvent.click(buttonOpenJoin[1]);

    //     const buttons = screen.getAllByRole("button");
    //     expect(await buttons[0]).toBeEnabled();
    //     expect(await buttons[1]).toBeEnabled();
    // });

    // test("if dialog validates user-input", async () => {
    //     const result = render(
    //         <Router>
    //             <AddGroupDialog />
    //         </Router>
    //     );

    //     //opens Selection for joining group odr creating a new one
    //     const buttonOpenSelection = result.getByLabelText("openGroupDialogButton");
    //     fireEvent.click(buttonOpenSelection);

    //     //check if Selection pops up
    //     const menuSelection = screen.getByRole("menu");
    //     expect(menuSelection.getAttribute("open")).toBeTruthy;

    //     // open the join Group Dialog
    //     const buttonOpenJoin = screen.getAllByRole("menuitem");
    //     fireEvent.click(buttonOpenJoin[1]);

    //     //check if it is open
    //     const joinGroupDialog = screen.getByRole("dialog");
    //     expect(joinGroupDialog.getAttribute("openJoin")).toBeTruthy;

    //     //try to join new group without input in the testField
    //     const buttons = screen.getAllByRole("button");
    //     fireEvent.click(buttons[0]);

    //     // check if error appears
    //     expect(await getByTestId(joinGroupDialog, "groupnameJoin").getAttribute("error")).toBeTruthy();
    // });
});
