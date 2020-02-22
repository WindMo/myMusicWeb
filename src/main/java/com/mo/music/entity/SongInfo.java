package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 歌曲信息 entity
 * @author Administrator
 *
 */
public class SongInfo {

	private BigDecimal Song_ID;
	private String Song_Name;
	private String Song_Artists;
	private String Song_Label;
	private String Song_Genre;
	private String Song_ReleasedTime;
	private String Song_Type;
	private String Song_AuditionAddress;
	private String Song_DownloadAddress;
	private String Song_Imge;
	private String download_count;
	
	public SongInfo() {
		super();
	}

	public SongInfo(BigDecimal song_ID, String song_Name, String song_Artists, String song_Label, String song_Genre,
					String song_ReleasedTime, String song_Type, String song_AuditionAddress, String song_DownloadAddress,
					String song_Imge, String download_count) {
		super();
		Song_ID = song_ID;
		Song_Name = song_Name;
		Song_Artists = song_Artists;
		Song_Label = song_Label;
		Song_Genre = song_Genre;
		Song_ReleasedTime = song_ReleasedTime;
		Song_Type = song_Type;
		Song_AuditionAddress = song_AuditionAddress;
		Song_DownloadAddress = song_DownloadAddress;
		Song_Imge = song_Imge;
		this.download_count = download_count;
	}



	/**
	 * 歌曲ID(主键)
	 * @return
	 */
	public BigDecimal getSong_ID() {
		return Song_ID;
	}

	/**
	 * 歌曲ID(主键)
	 * @param song_ID
	 */
	public void setSong_ID(BigDecimal song_ID) {
		Song_ID = song_ID;
	}

	/**
	 * get歌曲名称
	 * @return
	 */
	public String getSong_Name() {
		return Song_Name;
	}

	/**
	 * set歌曲名称
	 * @param song_Name
	 */
	public void setSong_Name(String song_Name) {
		Song_Name = song_Name;
	}

	/**
	 * get歌曲的艺术家
	 * @return
	 */
	public String getSong_Artists() {
		return Song_Artists;
	}

	/**
	 * set歌曲的艺术家
	 * @param song_Artists
	 */
	public void setSong_Artists(String song_Artists) {
		Song_Artists = song_Artists;
	}

	/**
	 * get歌曲的厂牌公司
	 * @return
	 */
	public String getSong_Label() {
		return Song_Label;
	}

	/**
	 * set歌曲的厂牌公司
	 * @param song_Label
	 */
	public void setSong_Label(String song_Label) {
		Song_Label = song_Label;
	}

	/**
	 * get歌曲的风格
	 * @return
	 */
	public String getSong_Genre() {
		return Song_Genre;
	}

	/**
	 * set歌曲的风格
	 * @param song_Genre
	 */
	public void setSong_Genre(String song_Genre) {
		Song_Genre = song_Genre;
	}

	/**
	 * get歌曲的上传时间
	 * @return
	 */
	public String getSong_ReleasedTime() {
		return Song_ReleasedTime;
	}

	/**
	 * set歌曲的上传时间
	 * @param song_ReleasedTime
	 */
	public void setSong_ReleasedTime(String song_ReleasedTime) {
		Song_ReleasedTime = song_ReleasedTime;
	}

	/**
	 * get歌曲的类型
	 * @return
	 */
	public String getSong_Type() {
		return Song_Type;
	}

	/**
	 * set歌曲的类型
	 * @param song_Type
	 */
	public void setSong_Type(String song_Type) {
		Song_Type = song_Type;
	}

	/**
	 * get歌曲的试听地址
	 * @return
	 */
	public String getSong_AuditionAddress() {
		return Song_AuditionAddress;
	}

	/**
	 * set歌曲的试听地址
	 * @param song_AuditionAddress
	 */
	public void setSong_AuditionAddress(String song_AuditionAddress) {
		Song_AuditionAddress = song_AuditionAddress;
	}

	/**
	 * get歌曲的下载地址
	 * @return
	 */
	public String getSong_DownloadAddress() {
		return Song_DownloadAddress;
	}

	/**
	 * set歌曲的下载地址
	 * @param song_DownloadAddress
	 */
	public void setSong_DownloadAddress(String song_DownloadAddress) {
		Song_DownloadAddress = song_DownloadAddress;
	}

	/**
	 * get歌曲的图片
	 * @return
	 */
	public String getSong_Imge() {
		return Song_Imge;
	}

	/**
	 * set歌曲的图片
	 * @param song_Imge
	 */
	public void setSong_Imge(String song_Imge) {
		Song_Imge = song_Imge;
	}

	public String getDownload_count() {
		return download_count;
	}

	public void setDownload_count(String download_count) {
		this.download_count = download_count;
	}
	
	
}
