import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        fontWhite: Palette["primary"];
        backgroundDark: Palette["primary"];
        notFilledGray: Palette["primary"];
        primaryButton: Palette["primary"];
        secondaryFont: Palette["primary"];
        foregroundGray: Palette["primary"];
        badRed: Palette["primary"];
        goodGreen: Palette["primary"];
    }
    interface PaletteOptions {
        fontWhite: PaletteOptions["primary"];
        notFilledGray: PaletteOptions["primary"];
        backgroundDark: PaletteOptions["primary"];
        primaryButton: PaletteOptions["primary"];
        secondaryFont: PaletteOptions["primary"];
        foregroundGray: PaletteOptions["primary"];
        badRed: PaletteOptions["primary"];
        goodGreen: PaletteOptions["primary"];
    }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        primaryButton: true;
        fontWhite: true;
        badRed: true;
    }
}

const theme = createTheme({
    typography: {
        fontFamily: ["Lato", "sans-serif"].join(","),
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#EFB90B",
        },
        secondary: {
            main: "#FFFFFF",
            contrastText: "#232532",
        },
        error: {
            main: "#F6455D",
        },
        backgroundDark: {
            main: "#181D25",
        },
        fontWhite: {
            main: "#FFFFFF",
            dark: "#b3b3b3",
        },
        notFilledGray: {
            main: "#AEB4BC",
            dark: "#737d8b",
        },
        primaryButton: {
            main: "#EFB90B",
            dark: "#a88207",
        },
        secondaryFont: {
            main: "#232532",
            dark: "#181a23",
        },
        foregroundGray: {
            main: "#4E5766",
            dark: "#363d47",
        },
        badRed: {
            main: "#F6455D",
            dark: "#d30a25",
        },
        goodGreen: {
            main: "#2DBD85",
            dark: "#1f855d",
        },
    },
});

export default theme;
