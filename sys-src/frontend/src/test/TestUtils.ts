import { act } from "@testing-library/react";

export class TestUtils {
    static async waitforMilliseconds(milliSeconds: number) {
        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, milliSeconds));
        });
    }
}
