import { List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FetchService } from "../FetchService";
import { Group } from "../models/Group";
import { GroupListItem } from "./GroupListItem";

export function GroupList() {
    const [groups, setGroups] = useState<Group[] | null>(null);
    function findGroups() {
        FetchService.get("http://localhost:8080/getGroups")
            .then((response) => response.json())
            .then((groups: Group[]) => console.log(groups))
            .catch((reason) => console.error(reason));
    }

    useEffect(() => {
        findGroups();
        console.log(groups);
    }, []);

    if (groups === null) {
        return null;
    }

    return (
        <>
            {groups.length ? (
                <List>
                    {groups.map((group) => (
                        <GroupListItem key={group.id} group={group} />
                    ))}
                </List>
            ) : (
                <Typography variant="h5" align="center" style={{ padding: "20px" }}>
                    Keine Gruppen vorhanden
                </Typography>
            )}
        </>
    );
}
