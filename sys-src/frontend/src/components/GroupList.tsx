import { List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FetchService } from "../FetchService";
import { Group } from "../models/Group";
import TitleAppBar from "./TitleAppBar";
import { GroupListItem } from "./GroupListItem";
import AddGroupDialog from "./AddGroupDialog";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../Routes";

export function GroupList() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[] | null>(null);
    function findGroups() {
        FetchService.get("http://localhost:8080/getGroups")
            .then((response) => response.json())
            .then((groups: Group[]) => setGroups(groups))
            .catch((reason) => console.error(reason));
    }

    useEffect(() => {
        findGroups();
    }, []);

    if (groups === null) {
        return null;
    }

    return (
        <>
            <TitleAppBar />
            <div id="groupsContainer">
                <Typography variant="h5" align="center" style={{ padding: "20px" }}>
                    Gruppen
                </Typography>
                {groups.length ? (
                    <List data-testid={"groupUL"}>
                        {groups.map((group) => (
                            <GroupListItem
                                key={group.id}
                                group={group}
                                onClick={() => navigate(PageRoutes.groupTemplate + group.id)}
                            />
                        ))}
                    </List>
                ) : (
                    <Typography id="noGroups" align="center" style={{ padding: "20px" }}>
                        Keine Gruppen vorhanden
                    </Typography>
                )}
            </div>
            <AddGroupDialog onReload={findGroups} />
        </>
    );
}
