export class FetchService {
    public static get<T = any>(url: string): Promise<T> {
        return fetch(url, {
            method: "GET",
            credentials: "include",
        }).then((response) => response.json());
    }

    public static post<T = any>(url: string, body: any): Promise<T> {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json());
    }
}
