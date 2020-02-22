package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 会员信息 entity
 * 
 * @author Administrator
 *
 */
public class MemberInfo {

	private BigDecimal Member_ID;
	private BigDecimal User_ID;
	private String Opening_Time;
	private String Expiry_Time;
	private String Member_Type;
	private BigDecimal Member_DownloadID;

	public MemberInfo() {
		super();
	}

	public MemberInfo(BigDecimal member_ID, BigDecimal user_ID, String opening_Time, String expiry_Time,
					  String member_Type, BigDecimal member_DownloadID) {
		super();
		Member_ID = member_ID;
		User_ID = user_ID;
		Opening_Time = opening_Time;
		Expiry_Time = expiry_Time;
		Member_Type = member_Type;
		Member_DownloadID = member_DownloadID;
	}

	/**
	 * 会员ID(主键)
	 * @return
	 */
	public BigDecimal getMember_ID() {
		return Member_ID;
	}

	/**
	 * 会员ID(主键)
	 * @param member_ID
	 */
	public void setMember_ID(BigDecimal member_ID) {
		Member_ID = member_ID;
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
	 * get会员开通时间
	 * @return
	 */
	public String getOpening_Time() {
		return Opening_Time;
	}

	/**
	 * set会员开通时间
	 * @param opening_Time
	 */
	public void setOpening_Time(String opening_Time) {
		Opening_Time = opening_Time;
	}

	/**
	 * get会员结束时间
	 * @return
	 */
	public String getExpiry_Time() {
		return Expiry_Time;
	}

	/**
	 * set会员结束时间
	 * @param expiry_Time
	 */
	public void setExpiry_Time(String expiry_Time) {
		Expiry_Time = expiry_Time;
	}

	/**
	 * get会员状态(月度/季度/年度)
	 * @return
	 */
	public String getMember_Type() {
		return Member_Type;
	}

	/**
	 * set会员状态(月度/季度/年度)
	 * @param member_Type
	 */
	public void setMember_Type(String member_Type) {
		Member_Type = member_Type;
	}

	/**
	 * get会员下载的ID(关联Download_Info)
	 * @return
	 */
	public BigDecimal getMember_DownloadID() {
		return Member_DownloadID;
	}

	/**
	 * set会员下载的ID(关联Download_Info)
	 * @return
	 */
	public void setMember_DownloadID(BigDecimal member_DownloadID) {
		Member_DownloadID = member_DownloadID;
	}

}
