import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

describe("App component", () => {
    test("contains heading", () => {
        const result = render(<App />);
        const heading = result.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });

    test("button click increases counter", async () => {
        const user = userEvent.setup();
        const result = render(<App />);
        const button = result.getAllByRole("button");

        expect(button[0]).toHaveTextContent("Einloggen");
        expect(button[1]).toHaveTextContent("Registrieren");
    });
});
