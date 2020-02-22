package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 下载信息 entity
 * @author Administrator
 *
 */
public class DownloadInfo {

	private BigDecimal Genre_ID;
	private BigDecimal User_ID;
	private String Genre_Name;
	private BigDecimal All_DownloadNum;
	private BigDecimal Surplus_Number;
	
	public DownloadInfo() {
		super();
	}
	
	public DownloadInfo(BigDecimal genre_ID, BigDecimal user_ID, String genre_Name, BigDecimal all_DownloadNum,
						BigDecimal surplus_Number) {
		super();
		Genre_ID = genre_ID;
		User_ID = user_ID;
		Genre_Name = genre_Name;
		All_DownloadNum = all_DownloadNum;
		Surplus_Number = surplus_Number;
	}

	/**
	 * 曲风ID(主键)
	 * @return
	 */
	public BigDecimal getGenre_ID() {
		return Genre_ID;
	}
	/**
	 * 曲风ID(主键)
	 * @return
	 */
	public void setGenre_ID(BigDecimal genre_ID) {
		Genre_ID = genre_ID;
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
	 * get曲风的名称
	 * @return
	 */
	public String getGenre_Name() {
		return Genre_Name;
	}

	/**
	 * set曲风的名称
	 * @param genre_Name
	 */
	public void setGenre_Name(String genre_Name) {
		Genre_Name = genre_Name;
	}

	/**
	 * get该曲风一共可以下载的歌曲数量
	 * @return
	 */
	public BigDecimal getAll_DownloadNum() {
		return All_DownloadNum;
	}

	/**
	 * set该曲风一共可以下载的歌曲数量
	 * @param all_DownloadNum
	 */
	public void setAll_DownloadNum(BigDecimal all_DownloadNum) {
		All_DownloadNum = all_DownloadNum;
	}

	/**
	 * get当前用户在该曲风中可下载的剩余数量
	 * @return
	 */
	public BigDecimal getSurplus_Number() {
		return Surplus_Number;
	}

	/**
	 * set当前用户在该曲风中可下载的剩余数量
	 * @param surplus_Number
	 */
	public void setSurplus_Number(BigDecimal surplus_Number) {
		Surplus_Number = surplus_Number;
	}

	
}
