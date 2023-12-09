export function composeHeader(token: string, isGet = true) {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    if (isGet) {
        return { headers }
    } else {
        return {
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
        }
    }
}