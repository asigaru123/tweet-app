package rest.login.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowerResource {
	
	private int id;
	private String email;
	private String followeremail;
	private String followerusername;
	private String time;
	private String profileImage;
}
