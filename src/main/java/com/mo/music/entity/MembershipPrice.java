package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 会员价格表
 * @author Administrator
 *
 */
public class MembershipPrice {
	
	private BigDecimal Price_ID;//ID
	private String Membership_Name;//会员名称
	private int Membership_Price;//会员价格
	private String Membership_Date;//会员月数
	private String Membership_Days;//会员天数
	private BigDecimal Downloads;// 会员下载数量
	
	public MembershipPrice(BigDecimal price_ID, String membership_Name, int membership_Price, String membership_Date,
						   String membership_Days, BigDecimal downloads) {
		super();
		Price_ID = price_ID;
		Membership_Name = membership_Name;
		Membership_Price = membership_Price;
		Membership_Date = membership_Date;
		Membership_Days = membership_Days;
		Downloads = downloads;
	}
	public MembershipPrice() {
		super();
	}
	public BigDecimal getPrice_ID() {
		return Price_ID;
	}
	public void setPrice_ID(BigDecimal price_ID) {
		Price_ID = price_ID;
	}
	public String getMembership_Name() {
		return Membership_Name;
	}
	public void setMembership_Name(String membership_Name) {
		Membership_Name = membership_Name;
	}
	public int getMembership_Price() {
		return Membership_Price;
	}
	public void setMembership_Price(int membership_Price) {
		Membership_Price = membership_Price;
	}
	public String getMembership_Date() {
		return Membership_Date;
	}
	public void setMembership_Date(String membership_Date) {
		Membership_Date = membership_Date;
	}
	public String getMembership_Days() {
		return Membership_Days;
	}
	public void setMembership_Days(String membership_Days) {
		Membership_Days = membership_Days;
	}
	public BigDecimal getDownloads() {
		return Downloads;
	}
	public void setDownloads(BigDecimal downloads) {
		Downloads = downloads;
	}
	
}
