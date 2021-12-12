package rest.login.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditUserAccount {
	
	private String email;
	private String password;
	private String username;
}
