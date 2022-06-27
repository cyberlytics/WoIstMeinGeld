import { act, RenderResult, waitForElementToBeRemoved } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";

export class TestUtils {
    private user: UserEvent;
    private result: RenderResult;

    constructor(result: RenderResult, user: UserEvent) {
        this.result = result;
        this.user = user;
    }

    public async type(input: HTMLInputElement, value: string, isNumberField: boolean = false) {
        if (!isNumberField)
            expect(input.value).toBe("");

        await this.user.type(input, value);
        expect(input.value).toBe(value);
    }

    public async selectOption(container: RenderResult, select: HTMLElement, value: string) {
        const creditorBtn = select?.parentNode?.querySelector("[role=button]");

        this.user.click(creditorBtn!);

        const options = container.getAllByRole("option");
        expect(options.length).toBeGreaterThan(0);
        const optionToChoose = options.find((option) => option.textContent === value);

        expect(optionToChoose).toBeTruthy();
        expect(optionToChoose).not.toBeNull();
        this.user.click(optionToChoose!);

        waitForElementToBeRemoved(() => document.body.querySelector("ul[role=listbox]"));
    }
}
