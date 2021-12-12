package rest.home.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Follow {
	
	private int id;
	private String email;
	private String followemail;
	private Date time;
}
