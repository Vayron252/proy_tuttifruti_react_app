export const getUserByCredentials = async (celular, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/getUserByCredentials/${celular}/${password}`);
    const result = await response.json();
    return result;
}

export const registerUser = async (user) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/registerUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const result = await response.json();
    return result;
}

export const getHallsByStatus = async (status) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games/getAllHallsByStatus/${status}`);
    const result = await response.json();
    return result;
}

export const registerHall = async (hall) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games/registerHall`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hall)
    });
    const result = await response.json();
    return result;
}