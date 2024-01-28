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

export const getHallsByStatus = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games/getAllHallsByStatus`);
    const result = await response.json();
    return result;
}

export const getHallById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games/getHallById/${id}`);
    const result = await response.json();
    return result;
}

export const getPlayersByRoomId = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games/getPlayersByRoomId/${id}`);
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

export const joinHall = async (game) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games/joinHall`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    });
    const result = await response.json();
    return result;
}