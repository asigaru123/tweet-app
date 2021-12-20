package rest.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

import rest.login.model.LoginUser;
import rest.login.model.Principal;
import rest.login.model.User;
import rest.login.repository.LoginMapper;

@Configuration
public class CustomAuthenticationProvider implements AuthenticationProvider{
	
	@Autowired
	LoginMapper userMapper;
	
	@Lazy
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException{
		Principal principal = (Principal) authentication.getPrincipal();
		if(principal == null) {
			throw new BadCredentialsException("認証情報がありません");
		}
		
		User user = userMapper.findByUser(principal.getEmail());
		
		if(user == null) {
			throw new BadCredentialsException("ユーザーが存在しません");
		}
		if(!(passwordEncoder.matches(principal.getPassword(), user.getPassword()))) {
			throw new BadCredentialsException("ユーザー名またはパスワードが一致しません");
		}
		
		List<GrantedAuthority> authorityList = new ArrayList<>();
		if(user.getRole() == 1) {
			authorityList = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
		}else {
			authorityList = AuthorityUtils.createAuthorityList("ROLE_USER");
		}
		
		LoginUser loginUser = new LoginUser(user.getEmail(), user.getPassword(), authorityList);
		
		return new UsernamePasswordAuthenticationToken(loginUser, principal.getPassword(), authorityList);
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}
}
