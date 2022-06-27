import { ThemeProvider } from "@mui/material";
import theme from "../ThemeProvider";
import { render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { afterEach, describe, expect, vi } from "vitest";
import { GroupList } from "../components/GroupList";
import { PageRoutes } from "../Routes";
import { groups } from "../mocks/handlers";
import userEvent from "@testing-library/user-event";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
    const other: any = await vi.importActual("react-router-dom");
    return {
        ...other,
        useNavigate: () => navigateMock,
        useLocation: vi.fn().mockImplementation(() => ({ pathname: PageRoutes.groups })),
    };
});

describe("GroupList", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders correctly", async () => {
        const user = userEvent.setup();
        const result = render(
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
                    <GroupList />
                </SnackbarProvider>
            </ThemeProvider>
        );

        await waitFor(() => {
            result.getByTestId("groupUL");
        });

        const ul = result.getByTestId("groupUL");
        expect(ul).toBeTruthy();
        expect(ul.childElementCount).toBe(groups.length);

        const li = ul.firstChild! as HTMLElement;
        await user.click(li);
        expect(navigateMock).toBeCalledWith(PageRoutes.groupTemplate + groups[0].id);
    });
});
