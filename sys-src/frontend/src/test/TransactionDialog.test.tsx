import { fireEvent, getByLabelText, getByTestId, getByText, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TransactionDialog from "../components/TransactionDialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import deLocale from "date-fns/locale/de";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SnackbarProvider } from "notistack";
import userEvent from "@testing-library/user-event";
import { TestUtils } from "./TestUtils";

const groupId = 1;
const handleReload = vi.fn();

describe("TransactionDialog", () => {
    const user = userEvent.setup({ skipHover: true });

    test("if dialog has buttons and input textfields", async () => {
        const { container } = render(
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                    <TransactionDialog groupId={groupId} onReload={handleReload} />
                </LocalizationProvider>
            </SnackbarProvider>
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

    test("if dialog can create transaction", async () => {
        const container = render(
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                    <TransactionDialog groupId={groupId} onReload={handleReload} />
                </LocalizationProvider>
            </SnackbarProvider>
        );
        const utils = new TestUtils(container, user);

        const button = container.getByLabelText("openDialogButton");
        fireEvent.click(button);

        //check if dialog pops up
        expect(screen.getByRole("dialog").getAttribute("open")).toBeTruthy;

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        // user input
        const descriptionInput = (await container.getByTestId("Verwendungszweck")) as HTMLInputElement;
        await utils.type(descriptionInput, "Rewe Einkauf");

        const amountInput = container.getByTestId("Betrag") as HTMLInputElement;
        await utils.type(amountInput, "30", true);

        const creditorInput = getByTestId(menuItem, "Gläubiger");
        await utils.selectOption(container, creditorInput, "Hans");

        // select Debtor
        const options = container.getAllByRole("option");
        expect(options.length).toBeGreaterThan(0);
        const debtorsToChoose = options.find((option) => option.textContent === "Hans");
        expect(debtorsToChoose).toBeTruthy();
        await fireEvent.mouseDown(debtorsToChoose! as HTMLElement);

        // try to create new transaction
        const buttonCreate = getByText(menuItem, "Anlegen");
        fireEvent.click(buttonCreate);

        // check if error appears
        expect(getByTestId(menuItem, "Verwendungszweck")).toBeValid();
        expect(getByTestId(menuItem, "Betrag")).toBeValid();
        expect(getByTestId(menuItem, "Gläubiger")).toBeValid();
        expect(getByTestId(menuItem, "Zahlungszeitpunkt")).toBeValid();
        expect(getByTestId(menuItem, "Schuldner")).toBeValid();

        //check if dialog closes
        expect(screen.getByRole("dialog").getAttribute("open")).toBeFalsy();
    });

    test("buttons are clickable", () => {
        const { container } = render(
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                    <TransactionDialog groupId={groupId} onReload={handleReload} />
                </LocalizationProvider>
            </SnackbarProvider>
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
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                    <TransactionDialog groupId={groupId} onReload={handleReload} />
                </LocalizationProvider>
            </SnackbarProvider>
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

    test("if dialog shows an error when all user-inputs are missing", async () => {
        const { container } = render(
            <SnackbarProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                    <TransactionDialog groupId={groupId} onReload={handleReload} />
                </LocalizationProvider>
            </SnackbarProvider>
        );

        const button = getByLabelText(container, "openDialogButton");
        fireEvent.click(button);

        // find the Home MenuItem
        const menuItem = screen.getByRole("dialog");

        //try to create new transaction
        const buttonCreate = getByText(menuItem, "Anlegen");
        fireEvent.click(buttonCreate);

        // check if error appears
        expect(getByTestId(menuItem, "Verwendungszweck")).toBeInvalid();
        expect(getByTestId(menuItem, "Betrag")).toBeInvalid();
        expect(getByTestId(menuItem, "Gläubiger")).toBeInvalid();
        expect(getByTestId(menuItem, "Zahlungszeitpunkt")).toBeValid();
        // expect(getByTestId(menuItem, "Schuldner")).toBeInvalid();

        //check if dialog closes
        expect(screen.getByRole("dialog").getAttribute("open")).toBeTruthy;
    });
});
