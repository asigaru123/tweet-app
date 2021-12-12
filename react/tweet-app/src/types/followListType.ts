import { FollowerType } from "./followerType";
import { FollowType } from "./followType";

export type FollowListType = {
    followResource: Array<FollowType>;
    followerResource: Array<FollowerType>;
}