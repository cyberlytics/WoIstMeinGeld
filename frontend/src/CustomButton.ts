import { styled, Button } from "@mui/material";

const CustomButton = styled(Button)(({ theme, color = "primary" }) => ({
    ":hover": {
        backgroundColor: theme.palette[color].dark,
    },
}));

export default CustomButton;
