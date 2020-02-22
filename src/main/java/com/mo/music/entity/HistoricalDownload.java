package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 历史下载 entity
 * @author Administrator
 *
 */
public class HistoricalDownload {

	private BigDecimal Historical_DownloadID;
	private BigDecimal User_ID;
	private BigDecimal Song_ID;
	
	public HistoricalDownload() {
		super();
	}

	public HistoricalDownload(BigDecimal historical_DownloadID, BigDecimal user_ID, BigDecimal song_ID) {
		super();
		Historical_DownloadID = historical_DownloadID;
		User_ID = user_ID;
		Song_ID = song_ID;
	}

	/**
	 * 历史下载ID(主键)
	 * @return
	 */
	public BigDecimal getHistorical_DownloadID() {
		return Historical_DownloadID;
	}

	/**
	 * 历史下载ID(主键)
	 * @param historical_DownloadID
	 */
	public void setHistorical_DownloadID(BigDecimal historical_DownloadID) {
		Historical_DownloadID = historical_DownloadID;
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
