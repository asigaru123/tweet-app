package rest.home.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Tweet {
	
	private int id;
	private String email;
	private Date time;
	private Date updatetime;
	private String username;
	private String tweet;
	private String profileImage;
}
