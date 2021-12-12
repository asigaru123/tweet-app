import { FollowerType } from "./followerType";
import { FollowType } from "./followType";

export type UserType = {
    token?: string,
    sub?: string,
    email?: string,
    password?: string,
    username?: string,
    role?: string,
    follow?: Array<FollowType>
    follower?: Array<FollowerType>
    profileImage?: string
}