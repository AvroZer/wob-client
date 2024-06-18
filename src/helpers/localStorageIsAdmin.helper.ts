export function getIsAdminFromLocalStorage(): boolean {
    const isAdminData = localStorage.getItem("isAdmin");
    const isAdmin: boolean = isAdminData ? JSON.parse(isAdminData) : false;

    return isAdmin;
}

export function setIsAdminToLocalStorage(key: string, isAdmin: boolean): void {
    localStorage.setItem(key, JSON.stringify(isAdmin));
}

export function removeIsAdminFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
