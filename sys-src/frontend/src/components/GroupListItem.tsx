import { ListItem, ListItemText } from "@mui/material";
import { Group } from "../models/Group";

interface Props {
    group: Group;
    onClick(): void;
}

export function GroupListItem(props: Props) {
    const { group, onClick } = props;
    const { name } = group;

    return (
        <ListItem className="listItem" onClick={onClick}>
            {" "}
            <ListItemText primary={name} style={{ padding: "10px" }} />
        </ListItem>
    );
}
