import { ListItem, ListItemText } from "@mui/material";
import { Group } from "../models/Group";

interface Props {
    group: Group;
}

export function GroupListItem(props: Props) {
    const { group } = props;
    const { name } = group;

    return (
        <ListItem
            divider
            disablePadding
            secondaryAction={<ListItemText primary={name} style={{ textAlign: "right" }} />}
        ></ListItem>
    );
}
