import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SignUpDialog } from "../components/SignUpDialog";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("SignUpDialog", () => {
    test("if dialog has buttons and input textfields", () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <SignUpDialog />
            </Router>
        );

        const buttons = screen.getAllByRole("button");
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

        const logInButton = screen.getAllByRole("button")[1];
        fireEvent.click(logInButton);
        expect(history.location.pathname).toBe("/signIn");
    });
});
