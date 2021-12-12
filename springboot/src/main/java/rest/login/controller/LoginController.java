package rest.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rest.login.model.ChangeProfileImageResource;
import rest.login.model.EditUserAccountResource;
import rest.login.model.FollowList;
import rest.login.model.SignupUserResource;
import rest.login.model.User;
import rest.login.service.LoginService;

@RestController
@RequestMapping("/api/login")
public class LoginController {

	@Autowired
	LoginService loginService;
	
	@PostMapping("/signup")
	public ResponseEntity<String> signupUser(@RequestBody SignupUserResource resource){
		int result = loginService.signupUser(resource);
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("ユーザー登録しました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("ユーザー登録に失敗しました", HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}
	
	@PostMapping("/editUserAccount")
	public ResponseEntity<String> editUserAccount(@RequestBody EditUserAccountResource resource){
		int result = loginService.editUserAccount(resource);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("ユーザー情報を更新しました。", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("ユーザー情報の更新に失敗しました。", HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}
	
	@GetMapping("/findUserAccount/{email:.+}")
	public User findUserAccount(@PathVariable("email") String email) {
		return loginService.findUserAccount(email);
	}
	
	@GetMapping("/getMyFollow/{email:.+}")
	public FollowList getMyFollow(@PathVariable("email") String email) {
		FollowList followList = new FollowList();
		followList.setFollowResource(loginService.getMyFollow(email));
		followList.setFollowerResource(loginService.getMyFollower(email));
		return followList;
	}
	
	@GetMapping("/getProfileImage/{email:.+}")
	public String getProfileImage(@PathVariable("email") String email) {
		return loginService.getProfileImage(email);
	}
	
	@PostMapping("/changeProfileImage/{email:.+}")
	public ResponseEntity<String> changeProfileImage(@RequestBody ChangeProfileImageResource resource, @PathVariable("email") String email) {
		int result = loginService.changeProfileImage(email, resource.getProfileImage());
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("変更しました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("変更に失敗しました。", HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}
}
