import { ThemeProvider } from "@mui/material";
import AppBar from "./AppBar";
import { PageRoutes } from "./Routes";
import { SignInDialog } from "./SignInDialog";
import { SignUpDialog } from "./SignUpDialog";
import theme from "./ThemeProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TransactionList } from "./components/TransactionList";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
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
