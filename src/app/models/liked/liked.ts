import { Project } from "../project/project";
import { User } from "../user/user";

export interface Liked {
    id: string;
    user: User;
    project: Project;
}