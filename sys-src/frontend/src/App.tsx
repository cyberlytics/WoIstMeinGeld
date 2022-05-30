import { ThemeProvider } from "@mui/material";
import { PageRoutes } from "./Routes";
import { SignInDialog } from "./components/SignInDialog";
import { SignUpDialog } from "./components/SignUpDialog";
import theme from "./ThemeProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TransactionList } from "./components/TransactionList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import deLocale from "date-fns/locale/de";

export function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={PageRoutes.signIn} element={<SignInDialog />} />
                            <Route path={PageRoutes.signUp} element={<SignUpDialog />} />
                            <Route path={PageRoutes.home} element={<SignInDialog />} />
                            <Route path={PageRoutes.transaction} element={<TransactionList />} />
                            <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.signIn} replace />} />
                        </Routes>
                    </BrowserRouter>
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
}
