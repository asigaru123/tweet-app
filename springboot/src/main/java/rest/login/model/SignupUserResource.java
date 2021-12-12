package rest.login.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupUserResource {
	
	private String email;
	private String password;
	private String username;
}
