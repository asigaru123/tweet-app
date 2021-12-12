package rest.home.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import rest.home.model.Follow;
import rest.home.model.Tweet;
import rest.home.model.TweetComment;
import rest.home.model.TweetCommentResource;

@Mapper
public interface HomeMapper {
	
	public List<Tweet> getAllTweets();
	
	public List<Tweet> getMyTweets(String email);
	
	public int insertTweet(Tweet tweet);
	
	public int updateTweet(Tweet tweet);
	
	public int deleteTweet(String email, int id);
	
	public int tweetLikeCount(int tweetid);
	
	public int insertTweetLike(String email, int tweetid);
	
	public int deleteTweetLike(String email, int tweetid);
	
	public List<String> getTweetLikeList(int tweetid);
	
	public int getTweetCommentCount(int tweetid);
	
	public List<TweetCommentResource> getTweetComment(int tweetid);
	
	public int insertTweetComment(TweetComment tweetComment);
	
	public int insertFollow(Follow follow);
	
	public int deleteFollow(String email, String followemail);

}
