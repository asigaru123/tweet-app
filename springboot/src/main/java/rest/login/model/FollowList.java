package rest.login.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowList {
	
	private List<FollowResource> followResource;
	private List<FollowerResource> followerResource;
}
