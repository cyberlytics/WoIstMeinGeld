import { fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TransactionDialog from "../components/TransactionDialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import deLocale from "date-fns/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";

const groupId = 1;
const handleReload = vi.fn();

describe("TransactionDialog", () => {
    test("if dialog has buttons and input textfields", async () => {
        const { container } = render(
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                <TransactionDialog groupId={groupId} onReload={handleReload} />
            </LocalizationProvider>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        //check if dialog pops up
        expect(screen.getByRole("dialog").getAttribute("open")).toBeTruthy;

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

    test("buttons are clickable", () => {
        const { container } = render(
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                <TransactionDialog groupId={groupId} onReload={handleReload} />
            </LocalizationProvider>
        );
        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        expect(getByText(menuItem, "Anlegen")).toBeEnabled();
        expect(getByText(menuItem, "Abbrechen")).toBeEnabled();
    });

    test("if dialog closes on pressed Close button", async () => {
        const { container } = render(
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                <TransactionDialog groupId={groupId} onReload={handleReload} />
            </LocalizationProvider>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        //close dialog
        const buttonEscape = getByText(menuItem, "Abbrechen");
        fireEvent.click(buttonEscape);

        expect(screen.getByRole("dialog").getAttribute("open")).toBeFalsy;
    });

    test("if dialog shows an error when user-iput is missing", async () => {
        const { container } = render(
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                <TransactionDialog groupId={groupId} onReload={handleReload} />
            </LocalizationProvider>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        //try to create new transaction
        const buttonCreate = getByText(menuItem, "Anlegen");
        fireEvent.click(buttonCreate);

        // check if error appears
        expect(await getByTestId(menuItem, "Verwendungszweck").getAttribute("error")).toBeTruthy();
    });
});
