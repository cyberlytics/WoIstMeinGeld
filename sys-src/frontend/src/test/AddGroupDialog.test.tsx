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
        const button = result.getAllByRole("button");
        fireEvent.click(button[1]);

        const menu = await screen.findByRole("menu");

        const menuItems = getAllByRole(menu, "menuitem");

        expect(menu).toBeInTheDocument();
        expect(menuItems[0]).toHaveTextContent("Neue Gruppe");
        expect(menuItems[1]).toHaveTextContent("Gruppe beitreten");
        expect(menuItems).toHaveLength(2);

        fireEvent.click(menuItems[0]);

        expect(screen.getByRole("dialog")).toHaveTextContent("Neue Gruppe erstellen");
    });

    test("if dialog has buttons and inputfields", async () => {
        const result = openDialog();

        const textfield = (await result).getByTestId("groupName");
        expect(textfield).toBeInTheDocument();

        const button = (await result).getAllByRole("button");
        expect(button[1]).toHaveTextContent("Gruppe erstellen");
        expect(button[0]).toHaveTextContent("Abbrechen");
    });

    test("if buttons and textfields are enabled", async () => {
        const result = openDialog();

        const textfield = (await result).getByTestId("groupName");
        expect(textfield).toBeEnabled;

        const button = (await result).getAllByRole("button");
        expect(button[0]).toBeEnabled;
        expect(button[1]).toBeEnabled;
    });

    test("if cancel button works", async () => {
        const result = openDialog();

        const button = (await result).getAllByRole("button");
        fireEvent.click(button[0]);

        const addGroupDialog = screen.getByRole("dialog");
        await waitForElementToBeRemoved(addGroupDialog);
        expect(addGroupDialog).not.toBeInTheDocument();
    });

    test("if there is an error when groupname is empty", async () => {
        const result = openDialog();

        const button = (await result).getAllByRole("button");
        fireEvent.click(button[1]);

        expect((await result).getByTestId("groupName")).toHaveTextContent("Ungültiger Gruppenname!");
    });
});

async function openDialog() {
    const result = render(
        <SnackbarProvider>
            <Router>
                <AddGroupDialog onReload={handleReload} />
            </Router>
        </SnackbarProvider>
    );
    const button = result.getAllByRole("button");
    fireEvent.click(button[1]);

    const menu = await screen.findByRole("menu");
    const menuItems = getAllByRole(menu, "menuitem");
    fireEvent.click(menuItems[0]);

    return result;
}
