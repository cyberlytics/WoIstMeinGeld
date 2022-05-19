const postFetch = (apiLocation: string, jsonBody: string): Promise<Response> => {
    return fetch(apiLocation, {
        method: "POST",
        body: jsonBody,
        headers: { "Content-Type": "application/json" },
    });
};

export default postFetch;
