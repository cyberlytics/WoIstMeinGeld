import { PureComponent, ReactNode } from "react";

class AppBar extends PureComponent {
    render(): ReactNode {
        return (
            <div className="appBarContainer">
                <h1 className="appBarTitle">Wo ist mein Geld?</h1>
            </div>
        );
    }
}
export default AppBar;
