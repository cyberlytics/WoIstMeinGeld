import {
    fireEvent,
    getAllByRole,
    queryByText,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect } from "vitest";
import { MemoryRouter, Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { GroupList } from "../components/GroupList";
import { GroupScreen } from "../components/GroupScreen";
import { PageRoutes } from "../Routes";

const getFirstGroup = async () => {
    const result = render(
        <BrowserRouter>
            <Routes>
                <Route path={PageRoutes.group} element={<GroupScreen />} />
                <Route path={PageRoutes.groups} element={<GroupList />} />
                <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.groups} replace />} />
            </Routes>
        </BrowserRouter>
    );

    //gets all groups from mocked server and checks for name
    const groupListItems = await result.findAllByRole("listitem");

    return groupListItems[0];
};

const getRemoveFromGroupButton = async () => {
    const firstGroup = await getFirstGroup();

    fireEvent.click(firstGroup);

    const secondGroup = screen.queryByText("Gruppe 2");

    expect(secondGroup).not.toBeInTheDocument();

    const buttons = await screen.findAllByRole("button");
    fireEvent.click(buttons[0]);

    const menu = screen.getByRole("menu");

    const menuItems = getAllByRole(menu, "menuitem");

    return menuItems[0];
};

describe("RemoveFromGroup", () => {
    test("if all groups are rendered in GroupList", async () => {
        const result = render(
            <MemoryRouter>
                <GroupList />
            </MemoryRouter>
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

        expect(transactionListItems[0]).toHaveTextContent("Bier");

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);

        const menu = screen.getByRole("menu");

        const menuItems = getAllByRole(menu, "menuitem");

        expect(menu).toBeInTheDocument();
        expect(menuItems[0]).toHaveTextContent("Aus Gruppe austreten");
        expect(menuItems[1]).toHaveTextContent("Ausloggen");
        expect(menuItems).toHaveLength(2);

        expect(window.location.pathname).toBe("/group/1");
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

        expect(window.location.pathname).toBe("/groups");
    });
});
