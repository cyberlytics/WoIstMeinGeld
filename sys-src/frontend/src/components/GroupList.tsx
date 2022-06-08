import { Button, List, Typography } from "@mui/material";
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
            <TitleAppBar isGroupScreen={false} />
            <div id="groupsContainer">
                <Typography variant="h5" align="center" style={{ padding: "20px" }}>
                    Gruppen
                </Typography>
                {groups.length ? (
                    <List>
                        {groups.map((group) => (
                            <div>
                                <GroupListItem key={group.id} group={group} />
                                <Button
                                    key={group.id + 10}
                                    onClick={() =>
                                        navigate(PageRoutes.groupScreenTemp, { state: { groupId: group.id } })
                                    }
                                >
                                    Zur Gruppe
                                </Button>
                            </div>
                        ))}
                    </List>
                ) : (
                    <Typography id="noGroups" align="center" style={{ padding: "20px" }}>
                        Keine Gruppen vorhanden
                    </Typography>
                )}
            </div>
            <AddGroupDialog />
        </>
    );
}
