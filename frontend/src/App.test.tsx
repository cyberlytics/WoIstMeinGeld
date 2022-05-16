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
        const button = result.getByRole("button");

        expect(button).toHaveTextContent("1");

        await user.click(button);

        expect(button).toHaveTextContent("2");
    });
});
