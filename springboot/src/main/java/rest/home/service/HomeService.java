package rest.home.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rest.home.model.Follow;
import rest.home.model.FollowResource;
import rest.home.model.Tweet;
import rest.home.model.TweetComment;
import rest.home.model.TweetCommentResource;
import rest.home.model.TweetResource;
import rest.home.repository.HomeMapper;

@Service
public class HomeService {
	
	@Autowired
	HomeMapper homeMapper;
	
	public List<TweetResource> getAllTweets(){
		List<Tweet> tweetList = homeMapper.getAllTweets();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		
		List<TweetResource> resourceList = new ArrayList<>();
		for(Tweet tweet : tweetList) {
			TweetResource resource = new TweetResource();
			String time = sdf.format(tweet.getUpdatetime());
			int tweetLikeCount = homeMapper.tweetLikeCount(tweet.getId());
			int tweetCommentCount = homeMapper.getTweetCommentCount(tweet.getId());
			List<String> tweetLikeList = homeMapper.getTweetLikeList(tweet.getId());
			
			resource.setId(tweet.getId());
			resource.setEmail(tweet.getEmail());
			resource.setUsername(tweet.getUsername());
			resource.setTime(time);
			resource.setTweet(tweet.getTweet());
			resource.setTweetLikeCount(tweetLikeCount);
			resource.setTweetCommentCount(tweetCommentCount);
			resource.setTweetCommentResource(homeMapper.getTweetComment(tweet.getId()));
			resource.setTweetLikeList(tweetLikeList);
			resource.setProfileImage(tweet.getProfileImage());
			
			resourceList.add(resource);
		}
		return resourceList;
	}
	
	public List<TweetResource> getMyTweets(String email){
		
		List<Tweet> tweetList = homeMapper.getMyTweets(email);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		
		List<TweetResource> resourceList = new ArrayList<>();
		for(Tweet tweet : tweetList) {
			TweetResource resource = new TweetResource();
			String time = sdf.format(tweet.getUpdatetime());
			int tweetLikeCount = homeMapper.tweetLikeCount(tweet.getId());
			int tweetCommentCount = homeMapper.getTweetCommentCount(tweet.getId());
			
			resource.setId(tweet.getId());
			resource.setEmail(tweet.getEmail());
			resource.setUsername(tweet.getUsername());
			resource.setTime(time);
			resource.setTweet(tweet.getTweet());
			resource.setTweetLikeCount(tweetLikeCount);
			resource.setTweetCommentCount(tweetCommentCount);
			resource.setTweetCommentResource(homeMapper.getTweetComment(tweet.getId()));
			resource.setProfileImage(tweet.getProfileImage());
			
			resourceList.add(resource);
		}
		return resourceList;
	}
	
	public int insertTweet(TweetResource resource) {
		Tweet tweet = new Tweet();
		Date time = new Date();
		
		tweet.setEmail(resource.getEmail());
		tweet.setUsername(resource.getUsername());
		tweet.setTime(time);
		tweet.setUpdatetime(time);
		tweet.setTweet(resource.getTweet());

		return homeMapper.insertTweet(tweet);
	}
	
	public int updateTweet(TweetResource resource) {
		Tweet tweet = new Tweet();
		Date date = new Date();
		
		tweet.setId(resource.getId());
		tweet.setEmail(resource.getEmail());
		tweet.setUpdatetime(date);
		tweet.setTweet(resource.getTweet());

		return homeMapper.updateTweet(tweet);
	}
	
	public int deleteTweet(String email, int id) {

		return homeMapper.deleteTweet(email, id);
	}
	
	public int insertTweetLike(String email, int tweetid) {

		return homeMapper.insertTweetLike(email, tweetid);
	}
	
	public int deleteTweetLike(String email, int tweetid) {

		return homeMapper.deleteTweetLike(email, tweetid);
	}
	
	public int insertTweetComment(TweetCommentResource resource) {
		TweetComment tweetComment = new TweetComment();
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		
		tweetComment.setEmail(resource.getEmail());
		tweetComment.setTweetid(resource.getTweetid());
		tweetComment.setComment(resource.getComment());
		tweetComment.setTime(sdf.format(date));
		
		return homeMapper.insertTweetComment(tweetComment);
	}
	
	public int deleteTweetComment(String email, int id) {
		return homeMapper.deleteTweetComment(email, id);
	}
	
	public int insertFollow(FollowResource resource) {
		Follow follow = new Follow();
		Date date = new Date();
		
		follow.setEmail(resource.getEmail());
		follow.setFollowemail(resource.getFollowemail());
		follow.setTime(date);

		return homeMapper.insertFollow(follow);
	}
	
	public int deleteFollow(String email, String followemail) {

		return homeMapper.deleteFollow(email, followemail);
	}
}
