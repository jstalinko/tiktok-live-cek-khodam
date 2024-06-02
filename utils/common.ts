export const randomString = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];    
};

export const validateString = (username: string) => {
    return /^[a-zA-Z0-9_.-]*$/.test(username);
};
