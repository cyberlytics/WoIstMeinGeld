import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";
import { GroupListItem } from "../components/GroupListItem";
import { groups } from "../mocks/handlers";

describe("GroupListItem", () => {
    test("renders correctly", async () => {
        const user = userEvent.setup();

        const mF = vi.fn();
        const testGroup = groups[0];
        const result = render(<GroupListItem group={testGroup} onClick={mF} />);

        const li = result.container.getElementsByTagName("li")[0];
        expect(li).toBeTruthy();
        expect(li).toHaveTextContent(testGroup.name);

        await user.click(li);
        expect(mF).toBeCalled();
    });
});
