package rest.home.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rest.home.model.FollowResource;
import rest.home.model.TweetCommentResource;
import rest.home.model.TweetResource;
import rest.home.service.HomeService;

@RestController
@RequestMapping("/api/home")
public class HomeController {
	
	@Autowired
	HomeService homeService;
	
	@GetMapping("/allTweets")
	public List<TweetResource> getAllTweets() {

		return homeService.getAllTweets();
	}
	
	@GetMapping("/mytweet/{email:.+}")
	public List<TweetResource> getMyTodos(@PathVariable("email") String email){

		return homeService.getMyTweets(email);
	}
	
	@PostMapping("/insertTweet")
	public ResponseEntity<String> insertTweet(@RequestBody TweetResource resource){
		int result = homeService.insertTweet(resource);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("ツイートしました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("ツイートに失敗しました", HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@PatchMapping("/updateTweet")
	public ResponseEntity<String> updateTweet(@RequestBody TweetResource resource){
		int result = homeService.updateTweet(resource);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("更新しました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("更新に失敗しました", HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@DeleteMapping("/deleteTweet/{email:.+}/{id}")
	public ResponseEntity<Void> deleteTweet(@PathVariable("email") String email, @PathVariable("id") int id){
		
		int result = homeService.deleteTweet(email, id);
		ResponseEntity<Void> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}else {
			responseEntity = new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@GetMapping("/insertTweetLike/{email:.+}/{id}")
	public ResponseEntity<String> insertTweetLike(@PathVariable("email") String email, @PathVariable("id") int tweetid){
		int result = homeService.insertTweetLike(email, tweetid);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("いいねしました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("いいねに失敗しました", HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@DeleteMapping("/deleteTweetLike/{email:.+}/{id}")
	public ResponseEntity<String> deleteTweetlilke(@PathVariable("email") String email, @PathVariable("id") int tweetid){
		int result = homeService.deleteTweetLike(email, tweetid);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("削除しました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("削除に失敗しました", HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@PostMapping("/insertTweetComment")
	public ResponseEntity<String> insertTweetComment(@RequestBody TweetCommentResource resource){
		int result = homeService.insertTweetComment(resource);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("コメントしました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("コメントに失敗しました", HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@PostMapping("/insertFollow")
	public ResponseEntity<String> insertFollow(@RequestBody FollowResource resource){
		int result = homeService.insertFollow(resource);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("フォローしました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("フォローに失敗しました", HttpStatus.BAD_REQUEST);
		}
		
		return responseEntity;
	}
	
	@DeleteMapping("/deleteFollow/{email:.+}/{friendemail:.+}")
	public ResponseEntity<String> deleteFollow(@PathVariable("email") String email, @PathVariable("friendemail") String followemail){
		int result = homeService.deleteFollow(email, followemail);
		
		ResponseEntity<String> responseEntity = null;
		if(result > 0) {
			responseEntity = new ResponseEntity<String>("削除しました", HttpStatus.CREATED);
		}else {
			responseEntity = new ResponseEntity<String>("削除に失敗しました", HttpStatus.CREATED);
		}
		
		return responseEntity;
	}
}
