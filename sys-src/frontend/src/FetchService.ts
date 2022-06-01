export class FetchService {
    public static get<T = any>(url: string): Promise<Response> {
        return fetch(url, {
            method: "GET",
            credentials: "include",
        });
    }

    public static post<T = any>(url: string, body: any): Promise<Response> {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
    }

    public static delete<T = any>(url: string, body: any): Promise<Response> {
        return fetch(url, {
            method: "DELETE",
            body: JSON.stringify(body),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
    }
}
