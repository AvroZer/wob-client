export interface IUser {
    id: number;
    email: string;
    login: string;
    token: string;
    isAdmin: boolean;
}

export interface IUserData {
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IResponseUser {
    id: number;
    email: string;
    login: string;
}

export interface IResponseUserData {
    token: string;
    user: IResponseUser;
}

export interface ICategory {
    id: number;
    title: string;
    news: [];
}

export interface INews {
    id: number;
    title: string;
    annotation: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: string;

    filename: string;
    originalName: string;
    size: number;
    mimetype: string;

    comment: IComment[];
}

export interface IComment {
    id: number;
    text: string;
    login: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGallery {
    id: number;
    title: string;
    filename: string;
}
