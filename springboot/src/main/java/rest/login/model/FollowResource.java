package rest.login.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowResource {
	
	private int id;
	private String email;
	private String followemail;
	private String followusername;
	private String time;
	private String profileImage;
}
