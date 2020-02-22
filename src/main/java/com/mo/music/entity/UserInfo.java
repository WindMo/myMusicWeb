package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 用户信息 entity
 * @author Administrator
 *
 */
public class UserInfo {

	private BigDecimal User_ID;
	private String User_Name;
	private String User_Password;
	private String User_Image;
	private String User_Sex;
	private String User_Job;
	private String Is_Administrators;
	private String User_Email;
	
	public UserInfo() {
		super();
	}

	public UserInfo(BigDecimal user_ID, String user_Name, String user_Password, String user_Image, String user_Sex,
					String user_Job, String is_Administrators, String user_Email) {
		super();
		User_ID = user_ID;
		User_Name = user_Name;
		User_Password = user_Password;
		User_Image = user_Image;
		User_Sex = user_Sex;
		User_Job = user_Job;
		Is_Administrators = is_Administrators;
		User_Email = user_Email;
	}

	/**
	 * 用户ID(主键)
	 * @return
	 */
	public BigDecimal getUser_ID() {
		return User_ID;
	}

	/**
	 * 用户ID(主键)
	 * @param user_ID
	 */
	public void setUser_ID(BigDecimal user_ID) {
		User_ID = user_ID;
	}

	/**
	 * get用户名
	 * @return
	 */
	public String getUser_Name() {
		return User_Name;
	}

	/**
	 * set用户名
	 * @param user_Name
	 */
	public void setUser_Name(String user_Name) {
		User_Name = user_Name;
	}

	/**
	 * get用户密码
	 * @return
	 */
	public String getUser_Password() {
		return User_Password;
	}

	/**
	 * set用户密码
	 * @param user_Password
	 */
	public void setUser_Password(String user_Password) {
		User_Password = user_Password;
	}

	/**
	 * get用户头像
	 * @return
	 */
	public String getUser_Image() {
		return User_Image;
	}

	/**
	 * set用户头像
	 * @param user_Image
	 */
	public void setUser_Image(String user_Image) {
		User_Image = user_Image;
	}

	/**
	 * get用户性别
	 * @return
	 */
	public String getUser_Sex() {
		return User_Sex;
	}

	/**
	 * set用户性别
	 * @param user_Sex
	 */
	public void setUser_Sex(String user_Sex) {
		User_Sex = user_Sex;
	}

	/**
	 * get用户的工作
	 * @return
	 */
	public String getUser_Job() {
		return User_Job;
	}

	/**
	 * set用户的工作
	 * @param user_Job
	 */
	public void setUser_Job(String user_Job) {
		User_Job = user_Job;
	}

	/**
	 * 判断是否是管理员
	 * @return
	 */
	public String getIs_Administrators() {
		return Is_Administrators;
	}

	/**
	 * 判断是否是管理员
	 * @param is_Administrators
	 */
	public void setIs_Administrators(String is_Administrators) {
		Is_Administrators = is_Administrators;
	}

	/**
	 * get用户邮箱
	 * @return
	 */
	public String getUser_Email() {
		return User_Email;
	}

	/**
	 * set用户邮箱
	 * @param user_Email
	 */
	public void setUser_Email(String user_Email) {
		User_Email = user_Email;
	}
	
}
