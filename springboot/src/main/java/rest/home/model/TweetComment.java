package rest.home.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetComment {
	
	private int id;
	private String email;
	private String username;
	private int tweetid;
	private String time;
	private String comment;
	private String profileImage;
}
