import { User } from "../user/user";

export interface Project {
    id: string;
    project_name: string;
    create_date: string;
    like_counter: number;
    description: string;
    user: User;
}