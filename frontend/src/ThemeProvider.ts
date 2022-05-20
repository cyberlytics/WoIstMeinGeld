import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        fontWhite: Palette["primary"];
        notFilledGray: Palette["primary"];
        primaryButton: Palette["primary"];
        secondaryFont: Palette["primary"];
        foregroundGray: Palette["primary"];
        badRed: Palette["primary"];
        goodGreen: Palette["primary"];
        inherit: Palette["primary"];
    }
    interface PaletteOptions {
        fontWhite: PaletteOptions["primary"];
        notFilledGray: PaletteOptions["primary"];
        primaryButton: PaletteOptions["primary"];
        secondaryFont: PaletteOptions["primary"];
        foregroundGray: PaletteOptions["primary"];
        badRed: PaletteOptions["primary"];
        goodGreen: PaletteOptions["primary"];
        inherit: PaletteOptions["primary"];
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

declare module "@mui/material/TextField" {
    interface TextFieldPropsColorOverrides {
        primaryButton: true;
    }
}

declare module "@mui/material/InputLabel" {
    interface InputLabelPropsColorOverrides {
        primaryButton: true;
    }
}

const theme = createTheme({
    typography: {
        fontFamily: ["Lato", "sans-serif"].join(","),
    },
    palette: {
        inherit: {
            main: "#FFF",
        },
        primary: {
            main: "#383A44",
            dark: "#27282f",
        },
        secondary: {
            main: "#181D25",
            dark: "#10141a",
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
