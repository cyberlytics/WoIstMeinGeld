import { fireEvent, getByLabelText, getByText, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TransactionDialog from "../components/TransactionDialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import deLocale from "date-fns/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";

describe("TransactionDialog", () => {
    test("if dialog has buttons and input textfields", async () => {
        const { container } = render(
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                <TransactionDialog />
            </LocalizationProvider>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        // make sure it was rendered
        expect(await getByText(menuItem, "Verwendungszweck")).toBeTruthy();
        expect(await getByText(menuItem, "Gläubiger")).toBeTruthy();
        expect(await getByText(menuItem, "Betrag")).toBeTruthy();
        expect(await getByText(menuItem, "Zahlungszeitpunkt")).toBeTruthy();
        expect(await getByText(menuItem, "Anlegen")).toBeTruthy();
        expect(await getByText(menuItem, "Abbrechen")).toBeTruthy();
    });
});
