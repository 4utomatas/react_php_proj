const tokenName = 'authenticationToken';
/**
 * @returns boolean value is the user authenticated
 */
export function IsAuthenticated() {
    return localStorage.getItem(tokenName) ? true : false;
}
/**
 * Set the authentication token
 * @param {string} newToken 
 */
export function SetToken(newToken) {
    localStorage.setItem(tokenName, newToken);
}
/**
 * Removes the token from local storage
 */
 export function RemoveToken() {
    localStorage.removeItem(tokenName);
}
/**
 * Returns the token from local storage if it is set
 */
export function GetToken() {
    return localStorage.getItem(tokenName);
}
