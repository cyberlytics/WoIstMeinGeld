import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { App } from "../App";

describe("App component", () => {
    test("contains heading", () => {
        const result = render(
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        );
        const heading = result.getByRole("heading");

        expect(heading).toBeInTheDocument();
    });
});
