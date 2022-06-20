import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SignUpDialog } from "../components/SignUpDialog";
import { createMemoryHistory } from "history";
import { MemoryRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import { PageRoutes } from "../Routes";
import { SignInDialog } from "../components/SignInDialog";
import { GroupList } from "../components/GroupList";
import userEvent from "@testing-library/user-event";

describe("SignUpDialog", () => {
    const renderElements = async () => {
        const result = render(
            <MemoryRouter>
                <Routes>
                    <Route path={PageRoutes.signIn} element={<SignInDialog />} />
                    <Route path={PageRoutes.signUp} element={<SignUpDialog />} />
                    <Route path={PageRoutes.home} element={<SignInDialog />} />
                    <Route path={PageRoutes.groups} element={<GroupList />} />
                    <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.signUp} replace />} />
                </Routes>
            </MemoryRouter>
        );

        const nameTextfield = (await result.findByTestId("signUpName")) as HTMLInputElement;
        const passwordTextfield = result.getByTestId("signUpPassword") as HTMLInputElement;

        const signUpButton = result.getAllByRole("signUpButton");

        return { name: nameTextfield, password: passwordTextfield, signup: signUpButton[0] };
    };
    test("if dialog has buttons and input textfields", () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <SignUpDialog />
            </Router>
        );

        const buttons = screen.getAllByRole("signUpButton");
        expect(buttons[0]).toHaveTextContent("Registrieren");
        expect(buttons[1]).toHaveTextContent("Einloggen");
        expect(buttons[0]).toBeEnabled();
        expect(buttons[1]).toBeEnabled();

        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    });

    test("if routing to SignInDialog works", () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <SignUpDialog />
            </Router>
        );

        const logInButton = screen.getAllByRole("signUpButton")[1];
        fireEvent.click(logInButton);
        expect(history.location.pathname).toBe("/signIn");
    });
    test("can signup with unique name", async () => {
        const { name, password, signup } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Gustav");
        await user.type(password, "password");

        await user.click(signup);

        await waitForElementToBeRemoved(signup);
        //gets all groups from mocked server and checks for name
        const groupListItems = await screen.findAllByRole("listitem");
        expect(groupListItems[0]).toHaveTextContent("Gruppe 1");

        expect(groupListItems).toHaveLength(3);
    });
    test("can't signup with used name", async () => {
        const { name, password, signup } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Hans");
        await user.type(password, "password");

        await user.click(signup);

        await waitFor(() => {
            expect(signup).toBeInTheDocument();
        });
    });
    test("signup with other credentials for 100% coverage", async () => {
        const { name, password, signup } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Albert");
        await user.type(password, "password");

        await user.click(signup);

        await waitForElementToBeRemoved(signup);
        //gets all groups from mocked server and checks for name
        const groupListItems = await screen.findAllByRole("listitem");
        expect(groupListItems[0]).toHaveTextContent("Gruppe 1");

        expect(groupListItems).toHaveLength(3);
    });
});
