package rest.login.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import rest.login.model.EditUserAccount;
import rest.login.model.EditUserAccountResource;
import rest.login.model.Follow;
import rest.login.model.FollowResource;
import rest.login.model.Follower;
import rest.login.model.FollowerResource;
import rest.login.model.SignupUser;
import rest.login.model.SignupUserResource;
import rest.login.model.User;
import rest.login.repository.LoginMapper;

@Service
public class LoginService {
	
	@Autowired
	LoginMapper loginMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public User findUserAccount(String email) {
		User user = new User();
		user.setUsername(loginMapper.findByUsername(email));
		
		return user;
	}
	
	public int signupUser(SignupUserResource resource) {
		SignupUser user = new SignupUser();
		String password = passwordEncoder.encode(resource.getPassword());
		user.setEmail(resource.getEmail());
		user.setPassword(password);
		user.setUsername(resource.getUsername());
		user.setRole(0);
		
		return loginMapper.signupUser(user);
	}
	
	public int editUserAccount(EditUserAccountResource resource) {
		EditUserAccount editUserAccount = new EditUserAccount();
		editUserAccount.setEmail(resource.getEmail());
		if(resource.getPassword() == "") {
			editUserAccount.setPassword(null);
		}else {
			String password = passwordEncoder.encode(resource.getPassword());
			editUserAccount.setPassword(password);
		}
		editUserAccount.setUsername(resource.getUsername());

		return loginMapper.editUserAccount(editUserAccount);
	}
	
	public List<FollowResource> getMyFollow(String email){
		List<Follow> list = loginMapper.getMyFollow(email);
		
		List<FollowResource> followList = new ArrayList<>();
		for(Follow follow : list) {
			FollowResource resource = new FollowResource();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			
			resource.setId(follow.getId());
			resource.setEmail(follow.getEmail());
			resource.setFollowemail(follow.getFollowemail());
			resource.setFollowusername(loginMapper.findByUsername(follow.getFollowemail()));
			resource.setTime(sdf.format(follow.getTime()));
			resource.setProfileImage(loginMapper.getProfileImage(follow.getFollowemail()));
			
			followList.add(resource);
		}
		return followList;
	}
	
	public List<FollowerResource> getMyFollower(String email){
		List<Follower> list = loginMapper.getMyFollower(email);
		
		List<FollowerResource> followerList = new ArrayList<>();
		for(Follower follower : list) {
			FollowerResource resource = new FollowerResource();
			SimpleDateFormat sdf = new SimpleDateFormat();
			
			resource.setId(follower.getId());
			resource.setEmail(follower.getFollowemail());
			resource.setFolloweremail(follower.getEmail());
			resource.setFollowerusername(loginMapper.findByUsername(follower.getEmail()));
			resource.setTime(sdf.format(follower.getTime()));
			resource.setProfileImage(loginMapper.getProfileImage(follower.getEmail()));
			
			followerList.add(resource);
		}
		return followerList;
	}
	
	public String getProfileImage(String email) {
		return loginMapper.getProfileImage(email);
	}
	
	public int changeProfileImage(String email, String profileImage) {
		return loginMapper.changeProfileImage(email, profileImage);
	}
}
