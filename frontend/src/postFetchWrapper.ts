const postFetch = (apiLocation: string, jsonBody: string): Promise<Response> => {
    return fetch(apiLocation, {
        method: "POST",
        body: jsonBody,
        credentials: "include", // Don't forget to specify this if you need cookies
        headers: { "Content-Type": "application/json" },
    });
};

export default postFetch;
