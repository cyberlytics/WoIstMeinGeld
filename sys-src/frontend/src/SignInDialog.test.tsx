import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { SignInDialog } from "./components/SignInDialog";

describe("SignInDialog Component", () => {
    test("contains textfields and buttons", () => {
        const result = render(
            <Router>
                <SignInDialog />
            </Router>
        );
        const button = result.getAllByRole("button");

        expect(result.getByLabelText("Name")).toBeInTheDocument();
        expect(result.getByLabelText("Passwort")).toBeInTheDocument();
        expect(button[0]).toHaveTextContent("Einloggen");
        expect(button[1]).toHaveTextContent("Registrieren");
    });

    test("buttons are clickable", () => {
        const result = render(
            <Router>
                <SignInDialog />
            </Router>
        );
        const button = result.getAllByRole("button");
        expect(button[0]).toBeEnabled();
        expect(button[1]).toBeEnabled();
    });
});
