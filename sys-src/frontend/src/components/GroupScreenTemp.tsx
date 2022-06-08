import { useLocation } from "react-router-dom";

interface Props {
    groupId: number;
}

export function GroupScreenTemp() {
    const location = useLocation();
    const { groupId } = location.state as Props;

    return <div>{groupId}</div>;
}
