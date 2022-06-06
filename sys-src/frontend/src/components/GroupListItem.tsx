import { ListItem, ListItemText } from "@mui/material";
import { Group } from "../models/Group";

interface Props {
    group: Group;
}

export function GroupListItem(props: Props) {
    const { group } = props;
    const { name } = group;

    return (
        <ListItem className="listItem">
            {" "}
            <ListItemText primary={name} style={{ padding: "10px" }} />
        </ListItem>
    );
}
