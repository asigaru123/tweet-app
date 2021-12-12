package rest.config;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

import rest.login.model.LoginUser;
import rest.login.model.User;
import rest.login.repository.LoginMapper;

public class CustomTokenFilter extends GenericFilterBean{
	
	final private LoginMapper userMapper;
	final private Algorithm algorithm;
	
	public CustomTokenFilter(LoginMapper userMapper, String secretKey) {
		this.userMapper = userMapper;
		try {
			this.algorithm = Algorithm.HMAC256(secretKey);
		}catch(UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException{
		String token = resolveToken(request);
		
		if(token == null) {
			chain.doFilter(request, response);
			return;
		}
		
		try {
			authentication(verifyToken(token));
		}catch(JWTVerificationException e) {
			SecurityContextHolder.clearContext();
			((HttpServletResponse) response).sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
		}
		chain.doFilter(request, response);
	}
	
	private String resolveToken(ServletRequest request) {
		String token = ((HttpServletRequest) request).getHeader("Authorization");
		
		if(token == null || !token.startsWith("Bearer ")) {
			return null;
		}
		return token.substring(7);
	}
	
	private DecodedJWT verifyToken(String token) {
		JWTVerifier verifier = JWT.require(algorithm).build();
		return verifier.verify(token);
	}
	
	private void authentication(DecodedJWT jwt) {
		Claim claim = jwt.getClaim("email");
		String email = claim.asString();
		
		User user = userMapper.findByUser(email);
		List<GrantedAuthority> authorityList = new ArrayList<>();
		if(user.getRole() == 1) {
			authorityList = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
		}else {
			authorityList = AuthorityUtils.createAuthorityList("ROLE_USER");
		}
		LoginUser loginUser = new LoginUser(user.getEmail(), user.getPassword(), authorityList);
		SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities()));
	}
}
