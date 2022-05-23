export function formatMoney(amount: number): string {
    return amount.toLocaleString(undefined, {
        currency: "EUR",
        style: "currency",
    });
}
