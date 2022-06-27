import { render, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GroupScreen } from "../components/GroupScreen";
import { PageRoutes } from "../Routes";
import { SnackbarProvider } from "notistack";
import userEvent from "@testing-library/user-event";

describe("GroupScreen Component", () => {
    test("group name as title", async () => {
        const result = render(
            <SnackbarProvider>
                <MemoryRouter initialEntries={["/group/3"]}>
                    <Routes>
                        <Route path={PageRoutes.group} element={<GroupScreen />} />
                    </Routes>
                </MemoryRouter>
            </SnackbarProvider>
        );

        let titleBar = result.getByTestId("titleAppBarTitle");

        expect(titleBar.textContent).toEqual("Wo ist mein Geld?");

        await waitFor(() => {
            expect(titleBar.textContent).toEqual("Gruppe 3");
        });
    });

    test("click on tabs", async () => {
        const user = userEvent.setup();

        const result = render(
            <SnackbarProvider>
                <MemoryRouter initialEntries={["/group/3"]}>
                    <Routes>
                        <Route path={PageRoutes.group} element={<GroupScreen />} />
                    </Routes>
                </MemoryRouter>
            </SnackbarProvider>
        );

        let noTransactionsText;
        let noRepaymentsText;

        await waitFor(() => {
            noTransactionsText = result.queryByText("Keine Ausgaben vorhanden");
            noRepaymentsText = result.queryByText("Keine Rückzahlungen nötig");
            expect(noTransactionsText).toBeInTheDocument();
            expect(noRepaymentsText).not.toBeInTheDocument();
        });

        const repaymentTab = result.getByText("Ausgleichszahlungen");

        await user.click(repaymentTab);

        await waitFor(() => {
            noTransactionsText = result.queryByText("Keine Ausgaben vorhanden");
            noRepaymentsText = result.queryByText("Keine Rückzahlungen nötig");
            expect(noTransactionsText).not.toBeInTheDocument();
            expect(noRepaymentsText).toBeInTheDocument();
        });

        const transactionTab = result.getByText("Ausgaben");

        await user.click(transactionTab);

        await waitFor(() => {
            noTransactionsText = result.queryByText("Keine Ausgaben vorhanden");
            noRepaymentsText = result.queryByText("Keine Rückzahlungen nötig");
            expect(noTransactionsText).toBeInTheDocument();
            expect(noRepaymentsText).not.toBeInTheDocument();
        });
    });
});
