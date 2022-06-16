import { fireEvent, getAllByRole, render, screen, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { Router } from "react-router-dom";
import { GroupList } from "../components/GroupList";
import { TestUtils } from "./TestUtils";
import { createMemoryHistory } from "history";

const getFirstGroup = async () => {
    const history = createMemoryHistory();
    const result = render(
        <Router location={history.location} navigator={history}>
            <GroupList />
        </Router>
    );

    // Wait for React to render the GroupList-Component
    await TestUtils.waitforMilliseconds(1000);

    //gets all groups from mocked server and checks for name
    const groupListItems = result.getAllByRole("listitem");

    return { firstGroup: groupListItems[0], history: history };
};

describe("RemoveFromGroup", () => {
    it("if all groups are rendered in GroupList", async () => {
        const history = createMemoryHistory();
        const result = render(
            <Router location={history.location} navigator={history}>
                <GroupList />
            </Router>
        );

        // Wait for React to render the GroupList-Component
        await TestUtils.waitforMilliseconds(1000);

        //gets all groups from mocked server and checks for name
        const groupListItems = result.getAllByRole("listitem");
        expect(groupListItems[0]).toHaveTextContent("Gruppe 1");
        expect(groupListItems[1]).toHaveTextContent("Gruppe 2");
        expect(groupListItems[2]).toHaveTextContent("Gruppe 3");

        expect(groupListItems).toHaveLength(3);

        expect(groupListItems[0]).toBeEnabled();
        expect(groupListItems[1]).toBeEnabled();
        expect(groupListItems[2]).toBeEnabled();
    });

    it("if user is removed from group", async () => {
        const { firstGroup, history } = await getFirstGroup();

        fireEvent.click(firstGroup);

        waitFor(
            () => {
                expect(history.location.pathname).toBe("/group/1");

                const transactionListItems = screen.getAllByRole("listitem");

                expect(transactionListItems[0]).toHaveTextContent("Bier");

                const buttons = screen.getAllByRole("button");
                fireEvent.click(buttons[0]);

                const menu = screen.getByRole("menu");

                const menuItems = getAllByRole(menu, "menuitem");

                expect(menu).toBeInTheDocument();
                expect(menuItems[0]).toHaveTextContent("Aus Gruppe austreten");
                expect(menuItems[1]).toHaveTextContent("Ausloggen");
                expect(menuItems).toHaveLength(2);

                fireEvent.click(menuItems[0]);

                expect(history.location.pathname).toBe("/groups");

                const groupListItems = screen.getAllByRole("listitem");

                expect(groupListItems[0]).toHaveTextContent("Gruppe 2");
                expect(groupListItems[1]).toHaveTextContent("Gruppe 3");

                expect(groupListItems).toHaveLength(2);

                expect(groupListItems[0]).toBeEnabled();
                expect(groupListItems[1]).toBeEnabled();
            },
            { timeout: 4000 }
        );
    });
});
