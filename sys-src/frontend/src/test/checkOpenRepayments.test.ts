import { checkOpenRepayments } from "../checkOpenRepayments";

describe("checkOpenRepayments", () => {
    test("has open repayments", async () => {
        let openRepayments: boolean = await checkOpenRepayments(1);
        expect(openRepayments).toEqual(true);
    });
    test("has closed repayments", async () => {
        let openRepayments: boolean = await checkOpenRepayments(2);
        expect(openRepayments).toEqual(false);
    });
});
