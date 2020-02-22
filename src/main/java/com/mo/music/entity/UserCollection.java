package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 用户收藏 entity
 * 
 * @author Administrator
 *
 */
public class UserCollection {

	private BigDecimal Collection_ID;
	private BigDecimal User_ID;
	private BigDecimal Song_ID;

	public UserCollection() {
		super();
	}

	public UserCollection(BigDecimal collection_ID, BigDecimal user_ID, BigDecimal song_ID) {
		super();
		Collection_ID = collection_ID;
		User_ID = user_ID;
		Song_ID = song_ID;
	}

	/**
	 * 收藏的ID(主键)
	 * @return
	 */
	public BigDecimal getCollection_ID() {
		return Collection_ID;
	}

	/**
	 * 收藏的ID(主键)
	 * @param collection_ID
	 */
	public void setCollection_ID(BigDecimal collection_ID) {
		Collection_ID = collection_ID;
	}

	/**
	 * get用户ID
	 * @return
	 */
	public BigDecimal getUser_ID() {
		return User_ID;
	}

	/**
	 * set用户ID
	 * @param user_ID
	 */
	public void setUser_ID(BigDecimal user_ID) {
		User_ID = user_ID;
	}

	/**
	 * get歌曲ID
	 * @return
	 */
	public BigDecimal getSong_ID() {
		return Song_ID;
	}

	/**
	 * set歌曲ID
	 * @param song_ID
	 */
	public void setSong_ID(BigDecimal song_ID) {
		Song_ID = song_ID;
	}

}
