import { render, waitFor, screen, waitForElementToBeRemoved, getAllByRole, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router, MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { GroupList } from "../components/GroupList";
import { SignInDialog } from "../components/SignInDialog";
import { SignUpDialog } from "../components/SignUpDialog";
import { PageRoutes } from "../Routes";

describe("SignInDialog Component", () => {
    const renderElements = async () => {
        const result = render(
            <SnackbarProvider>
                <MemoryRouter>
                    <Routes>
                        <Route path={PageRoutes.signIn} element={<SignInDialog />} />
                        <Route path={PageRoutes.signUp} element={<SignUpDialog />} />
                        <Route path={PageRoutes.home} element={<SignInDialog />} />
                        <Route path={PageRoutes.groups} element={<GroupList />} />
                        <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.signIn} replace />} />
                    </Routes>
                </MemoryRouter>
            </SnackbarProvider>
        );

        const nameTextfield = (await result.findByTestId("signInName")) as HTMLInputElement;
        const passwordTextfield = result.getByTestId("signInPassword") as HTMLInputElement;

        const loginButton = result.getAllByRole("signInButton");

        return { name: nameTextfield, password: passwordTextfield, login: loginButton[0] };
    };
    test("contains textfields and buttons", () => {
        const result = render(
            <SnackbarProvider>
                <Router>
                    <SignInDialog />
                </Router>
            </SnackbarProvider>
        );
        const button = result.getAllByRole("signInButton");

        expect(result.getByLabelText("Name")).toBeInTheDocument();
        expect(result.getByLabelText("Passwort")).toBeInTheDocument();
        expect(button[0]).toHaveTextContent("Einloggen");
        expect(button[1]).toHaveTextContent("Registrieren");
    });

    test("buttons are clickable", () => {
        const result = render(
            <SnackbarProvider>
                <Router>
                    <SignInDialog />
                </Router>
            </SnackbarProvider>
        );
        const button = result.getAllByRole("signInButton");
        expect(button[0]).toBeEnabled();
        expect(button[1]).toBeEnabled();
    });

    test("can login with right credentials", async () => {
        const { name, password, login } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Hans");
        await user.type(password, "password");

        await user.click(login);

        await waitForElementToBeRemoved(login);

        //gets all groups from mocked server and checks for name
        const groupListItems = await screen.findAllByRole("listitem");
        expect(groupListItems[0]).toHaveTextContent("Gruppe 1");

        expect(groupListItems).toHaveLength(3);
    });
    test("can't login with wrong name", async () => {
        const { name, password, login } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Gustav");
        await user.type(password, "password");

        await user.click(login);

        await waitFor(() => {
            expect(login).toBeInTheDocument();
        });
    });
    test("can't login with wrong password", async () => {
        const { name, password, login } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Hans");
        await user.type(password, "wrongPassword");

        await user.click(login);

        await waitFor(() => {
            expect(login).toBeInTheDocument();
        });
    });
    test("login with other credentials for 100% coverage", async () => {
        const { name, password, login } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Franz");
        await user.type(password, "password");

        await user.click(login);

        await waitForElementToBeRemoved(login);
        //gets all groups from mocked server and checks for name
        const groupListItems = await screen.findAllByRole("listitem");
        expect(groupListItems[0]).toHaveTextContent("Gruppe 1");

        expect(groupListItems).toHaveLength(3);
    });
    test("logout after successful login", async () => {
        const { name, password, login } = await renderElements();
        const user = userEvent.setup();

        await user.type(name, "Hans");
        await user.type(password, "password");

        await user.click(login);

        await waitForElementToBeRemoved(login);

        const menuButton = await screen.findByTestId("openThreePointMenu");
        await user.click(menuButton);

        const menu = await screen.findByRole("menu");

        const menuItems = getAllByRole(menu, "menuitem");

        expect(menu).toBeInTheDocument();
        expect(menuItems[0]).toHaveTextContent("Ausloggen");
        expect(menuItems).toHaveLength(1);

        await user.click(menuItems[0]);
        await waitForElementToBeRemoved(menuItems[0]);

        const loginButton = await screen.findAllByRole("signInButton");

        expect(loginButton[0]).toHaveTextContent("Einloggen");
    });
});
