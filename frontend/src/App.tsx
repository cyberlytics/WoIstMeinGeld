import { ThemeProvider } from "@mui/material";
import AppBar from "./AppBar";
import { PageRoutes } from "./Routes";
import { SignInDialog } from "./SignInDialog";
import { SignUpDialog } from "./SignUpDialog";
import theme from "./ThemeProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar />
                <BrowserRouter>
                    <Routes>
                        <Route path={PageRoutes.signIn} element={<SignInDialog />} />
                        <Route path={PageRoutes.signUp} element={<SignUpDialog />} />
                        <Route path={PageRoutes.home} element={<SignInDialog />} />
                        <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.signIn} replace />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}
