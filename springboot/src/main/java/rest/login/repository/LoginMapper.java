package rest.login.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import rest.login.model.EditUserAccount;
import rest.login.model.Follow;
import rest.login.model.Follower;
import rest.login.model.SignupUser;
import rest.login.model.User;

@Mapper
public interface LoginMapper {
	public User findByUser(String email);
	
	public String findByUsername(String followemail);
	
	public int signupUser(SignupUser signupUser);
	
	public int editUserAccount(EditUserAccount editUserAccount);
	
	public int deleteUserAccount(String email);
	
	public List<Follow> getMyFollow(String email);
	
	public List<Follower> getMyFollower(String email);
	
	public String getProfileImage(String email);
	
	public int changeProfileImage(String email, String profileImage);
}
