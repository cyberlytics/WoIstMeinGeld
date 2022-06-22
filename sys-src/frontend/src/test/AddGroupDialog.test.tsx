import { fireEvent, getAllByRole, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import AddGroupDialog from "../components/AddGroupDialog";
import { BrowserRouter as Router } from "react-router-dom";
import { vi } from "vitest";
import { SnackbarProvider } from "notistack";

const handleReload = vi.fn();

describe("AddGroupDialog Component", () => {
    test("if dialog opens", async () => {
        const result = render(
            <SnackbarProvider>
                <Router>
                    <AddGroupDialog onReload={handleReload} />
                </Router>
            </SnackbarProvider>
        );
        const button = result.getByTestId("openGroupDialogButton");
        fireEvent.click(button);

        const menu = await screen.findByRole("menu");

        const menuItems = getAllByRole(menu, "menuitem");

        expect(menu).toBeInTheDocument();
        expect(menuItems[0]).toHaveTextContent("Neue Gruppe");
        expect(menuItems[1]).toHaveTextContent("Gruppe beitreten");
        expect(menuItems).toHaveLength(2);

        const newGroup = result.getByTestId("newGroup");
        fireEvent.click(newGroup);

        expect(screen.getByRole("dialog")).toHaveTextContent("Neue Gruppe erstellen");
    });

    test("if dialog has buttons and inputfields", () => {
        const result = openDialog();

        const textfield = result.getByTestId("groupName");
        expect(textfield).toBeInTheDocument();

        const createButton = result.getByTestId("createGroup");
        expect(createButton).toHaveTextContent("Gruppe erstellen");

        const cancelButton = result.getByTestId("cancelCreateGroup");
        expect(cancelButton).toHaveTextContent("Abbrechen");
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

    test("if cancel button works", async () => {
        const result = openDialog();

        const cancelButton = result.getByTestId("cancelCreateGroup");
        fireEvent.click(cancelButton);

        const addGroupDialog = screen.getByRole("dialog");
        await waitForElementToBeRemoved(addGroupDialog);
        expect(addGroupDialog).not.toBeInTheDocument();
    });

    test("if there is an error when groupname is empty", () => {
        const result = openDialog();

        const createButton = result.getByTestId("createGroup");
        fireEvent.click(createButton);

        expect(result.getByTestId("groupName")).toHaveTextContent("Ungültiger Gruppenname!");
    });
});

function openDialog() {
    const result = render(
        <SnackbarProvider>
            <Router>
                <AddGroupDialog onReload={handleReload} />
            </Router>
        </SnackbarProvider>
    );
    const button = result.getByTestId("openGroupDialogButton");
    fireEvent.click(button);
    const newGroup = result.getByTestId("newGroup");
    fireEvent.click(newGroup);

    return result;
}
