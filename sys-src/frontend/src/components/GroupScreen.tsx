import { Description, SyncAlt } from "@mui/icons-material";
import { AppBar, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchService } from "../FetchService";
import { Transaction } from "../models/Transaction";
import { RepaymentList } from "./RepaymentList";
import TitleAppBar from "./TitleAppBar";
import { TransactionList } from "./TransactionList";

export function GroupScreen() {
    const { groupId } = useParams(); // TODO: use it to distinguish between groups
    const [activeTab, setActiveTab] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);

    function findAllTransactions() {
        FetchService.get("http://localhost:8080/findAllTransactions")
            .then((response) => response.json())
            .then((transactions: Transaction[]) => setTransactions(transactions))
            .catch((reason) => console.error(reason));
    }

    useEffect(() => {
        findAllTransactions();
    }, []);

    return (
        <>
            <TitleAppBar />
            <AppBar position="static" sx={{ backgroundColor: "backgroundDark.main", backgroundImage: "none" }}>
                <Tabs variant="fullWidth" value={activeTab} onChange={(_, newActiveTab) => setActiveTab(newActiveTab)}>
                    <Tab label="Ausgaben" icon={<Description />} />
                    <Tab label="Ausgleichszahlungen" icon={<SyncAlt />} />
                </Tabs>
            </AppBar>
            {transactions && (
                <div style={{ padding: 24 }}>
                    {activeTab === 0 ? (
                        <TransactionList transactions={transactions} onReload={findAllTransactions} />
                    ) : (
                        <RepaymentList transactions={transactions} onReload={findAllTransactions} />
                    )}
                </div>
            )}
        </>
    );
}
