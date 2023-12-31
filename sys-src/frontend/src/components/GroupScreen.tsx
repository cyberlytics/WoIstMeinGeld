import { Description, SyncAlt } from "@mui/icons-material";
import { AppBar, Tab, Tabs } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchService } from "../FetchService";
import { Group } from "../models/Group";
import { Transaction } from "../models/Transaction";
import { RepaymentList } from "./RepaymentList";
import TitleAppBar from "./TitleAppBar";
import { TransactionList } from "./TransactionList";

export function GroupScreen() {
    const groupId = Number.parseInt(useParams().groupId || "0");
    const [group, setGroup] = useState<Group | null>(null);

    const [activeTab, setActiveTab] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);

    const getTransactionsByGroup = useCallback(() => {
        FetchService.get("http://localhost:8080/transactions/" + groupId)
            .then((response) => response.json())
            .then((transactions: Transaction[]) => setTransactions(transactions))
            .catch((reason) => console.error(reason));
    }, [groupId]);

    useEffect(() => {
        FetchService.get("http://localhost:8080/getGroups")
            .then((response) => response.json())
            .then((groups: Group[]) => {
                for (const group of groups) {
                    if (group.id === groupId) {
                        setGroup(group);
                        break;
                    }
                }
            })
            .catch((reason) => console.error(reason));
    }, [groupId]);

    useEffect(() => getTransactionsByGroup(), [getTransactionsByGroup]);

    return (
        <>
            <TitleAppBar title={group ? group.name : undefined} isGroupScreen={true} groupId={groupId} />
            <AppBar position="static" sx={{ backgroundColor: "backgroundDark.main", backgroundImage: "none" }}>
                <Tabs variant="fullWidth" value={activeTab} onChange={(_, newActiveTab) => setActiveTab(newActiveTab)}>
                    <Tab label="Ausgaben" icon={<Description />} />
                    <Tab label="Ausgleichszahlungen" icon={<SyncAlt />} />
                </Tabs>
            </AppBar>
            {transactions && (
                <div style={{ padding: 24 }}>
                    {activeTab === 0 ? (
                        <TransactionList
                            groupId={groupId}
                            transactions={transactions}
                            onReload={getTransactionsByGroup}
                        />
                    ) : (
                        <RepaymentList
                            groupId={groupId}
                            transactions={transactions}
                            onReload={getTransactionsByGroup}
                        />
                    )}
                </div>
            )}
        </>
    );
}
