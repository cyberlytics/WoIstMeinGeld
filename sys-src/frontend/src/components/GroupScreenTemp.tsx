import { useLocation } from "react-router-dom";
import TitleAppBar from "./TitleAppBar";

interface Props {
    groupId: number;
}

export function GroupScreenTemp() {
    const location = useLocation();
    const { groupId } = location.state as Props;

    return (
        <>
            <TitleAppBar isGroupScreen={true} groupId={groupId} />
            <div>{groupId}</div>
        </>
    );
}
