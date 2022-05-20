import { styled, TextField } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
    "& label.Mui-focused": {
        color: theme.palette.notFilledGray.main,
    },
    "& label": {
        color: theme.palette.notFilledGray.main,
    },
    "& input": {
        color: theme.palette.fontWhite.main,
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.notFilledGray.main,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.fontWhite.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.fontWhite.main,
        },
    },
}));

export default CustomTextField;
