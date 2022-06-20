import { render } from "@testing-library/react";
import { App } from "../App";

describe("App component", () => {
    test("contains heading", () => {
        const result = render(<App />);
        const heading = result.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });
});
