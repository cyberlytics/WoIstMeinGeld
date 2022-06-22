import { fireEvent, getAllByRole, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect } from "vitest";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { GroupList } from "../components/GroupList";
import { GroupScreen } from "../components/GroupScreen";
import { PageRoutes } from "../Routes";
import { SnackbarProvider } from "notistack";

const getFirstGroup = async () => {
    const result = render(
        <SnackbarProvider>
            <MemoryRouter>
                <Routes>
                    <Route path={PageRoutes.group} element={<GroupScreen />} />
                    <Route path={PageRoutes.groups} element={<GroupList />} />
                    <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.groups} replace />} />
                </Routes>
            </MemoryRouter>
        </SnackbarProvider>
    );

    //gets all groups from mocked server and checks for name
    const groupListItems = await result.findAllByRole("listitem");

    return groupListItems[0];
};

const getRemoveFromGroupButton = async () => {
    const firstGroup = await getFirstGroup();

    fireEvent.click(firstGroup);

    await waitFor(() => {
        expect(firstGroup).not.toBeInTheDocument();
    });

    const menuButton = screen.getByTestId("openThreePointMenu");
    fireEvent.click(menuButton);

    const menu = await screen.findByRole("menu");

    const menuItems = getAllByRole(menu, "menuitem");

    return menuItems[1];
};

describe("RemoveFromGroup", () => {
    test("if all groups are rendered in GroupList", async () => {
        const result = render(
            <SnackbarProvider>
                <MemoryRouter>
                    <GroupList />
                </MemoryRouter>
            </SnackbarProvider>
        );

        //gets all groups from mocked server and checks for name
        const groupListItems = await result.findAllByRole("listitem");
        expect(groupListItems[0]).toHaveTextContent("Gruppe 1");
        expect(groupListItems[1]).toHaveTextContent("Gruppe 2");
        expect(groupListItems[2]).toHaveTextContent("Gruppe 3");

        expect(groupListItems).toHaveLength(3);

        expect(groupListItems[0]).toBeEnabled();
        expect(groupListItems[1]).toBeEnabled();
        expect(groupListItems[2]).toBeEnabled();
    });

    test("if GroupScreen has menu to leave group", async () => {
        const firstGroup = await getFirstGroup();

        fireEvent.click(firstGroup);

        // wait for GroupList to disappear
        await waitFor(() => {
            expect(firstGroup).not.toBeInTheDocument();
        });

        const transactionListItems = await screen.findAllByRole("listitem");

        expect(transactionListItems[0]).toHaveTextContent("Himbeeren");

        const menuButton = screen.getByTestId("openThreePointMenu");
        fireEvent.click(menuButton);

        const menu = await screen.findByRole("menu");

        const menuItems = getAllByRole(menu, "menuitem");

        expect(menu).toBeInTheDocument();
        expect(menuItems[0]).toHaveTextContent("Gruppen-ID kopieren");
        expect(menuItems[1]).toHaveTextContent("Aus Gruppe austreten");
        expect(menuItems[2]).toHaveTextContent("Gruppe löschen");
        expect(menuItems[3]).toHaveTextContent("Ausloggen");
        expect(menuItems).toHaveLength(4);
    });

    test("if leaving group is possible and redirection to GroupList", async () => {
        const removeButton = await getRemoveFromGroupButton();

        fireEvent.click(removeButton);

        await waitForElementToBeRemoved(removeButton);

        const groupListItems = await screen.findAllByRole("listitem");

        expect(groupListItems[0]).toHaveTextContent("Gruppe 2");
        expect(groupListItems[1]).toHaveTextContent("Gruppe 3");

        expect(groupListItems).toHaveLength(2);

        expect(groupListItems[0]).toBeEnabled();
        expect(groupListItems[1]).toBeEnabled();
    });
});
