package rest.config;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import rest.login.model.LoginUser;
import rest.login.model.Principal;
import rest.login.model.User;
import rest.login.repository.LoginMapper;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private final LoginMapper userMapper;
	private final Algorithm algorithm;
	
	public CustomAuthenticationFilter(LoginMapper userMapper, String secretKey) {
		this.userMapper = userMapper;
		try {
			this.algorithm = Algorithm.HMAC256(secretKey);
		}catch(UnsupportedEncodingException e){
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
		try {
			Principal principal = new ObjectMapper().readValue(request.getInputStream(), Principal.class);
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(principal, null);
			setDetails(request, authRequest);
			return this.getAuthenticationManager().authenticate(authRequest);
		}catch(Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth) {
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		setToken(response, generateToken(auth));
		response.setStatus(HttpStatus.OK.value());
		clearAuthenticationAttributes(request);
	}
	
	private static final Long EXPIRATION_TIME = 1000L * 60L * 60L;
	
	private String generateToken(Authentication auth) {
		LoginUser loginUser = (LoginUser)auth.getPrincipal();
		User user = userMapper.findByUser(loginUser.getEmail());
		loginUser.setUsername(user.getUsername());
		String role = "";
		if(user.getRole() == 1) {
			role = "ADMIN";
		}else if(user.getRole() == 0) {
			role = "USER";
		}
		
		Date issuedAt = new Date();
		Date notBefore = new Date(issuedAt.getTime());
		Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);
		String token = JWT.create()
				.withIssuedAt(issuedAt)
				.withNotBefore(notBefore)
				.withExpiresAt(expiresAt)
				.withSubject("JWT user in API")
				.withClaim("email", loginUser.getEmail())
				.withClaim("username", loginUser.getUsername())
				.withClaim("role", role)
				.sign(this.algorithm);
		return token;
	}
	
	private void setToken(HttpServletResponse response, String token) {
		response.setHeader("Access-Control-Expose-Headers", "Authorization");
		response.setHeader("Authorization", String.format("Bearer %s", token));
	}
	
	private void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(true);
		
		if(session == null) {
			return;
		}
		
		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}
}
