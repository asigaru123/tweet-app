package rest.home.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetResource {
	
	private int id;
	private String email;
	private String time;
	private String username;
	private String tweet;
	private int tweetLikeCount;
	private int tweetCommentCount;
	private List<TweetCommentResource> tweetCommentResource;
	private List<String> tweetLikeList;
	private String profileImage;
}
