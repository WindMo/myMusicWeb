package com.mo.music.entity;

/**
 * 设置 表
 * @author Administrator
 *
 */
public class Setting {
	private int Setting_ID;//设置ID
	private String IsLandingAuditions;//是否运行登陆后才能试听
	public Setting(int setting_ID, String isLandingAuditions) {
		super();
		Setting_ID = setting_ID;
		IsLandingAuditions = isLandingAuditions;
	}
	public Setting() {
		super();
	}
	public int getSetting_ID() {
		return Setting_ID;
	}
	public void setSetting_ID(int setting_ID) {
		Setting_ID = setting_ID;
	}
	public String getIsLandingAuditions() {
		return IsLandingAuditions;
	}
	public void setIsLandingAuditions(String isLandingAuditions) {
		IsLandingAuditions = isLandingAuditions;
	}
	
}
