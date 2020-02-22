package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 生成Token Entity
 * @author Administrator
 *
 */
public class Token {
	
	private BigDecimal Token_ID;// Token 表ID
	private BigDecimal User_ID;// 用户ID
	private String Token_Value;// Token的值
	private String TokenExpireIn_Time;// Token有效时间
	public Token(BigDecimal token_ID, BigDecimal user_ID, String token_Value, String tokenExpireIn_Time) {
		super();
		Token_ID = token_ID;
		User_ID = user_ID;
		Token_Value = token_Value;
		TokenExpireIn_Time = tokenExpireIn_Time;
	}
	public Token() {
		super();
	}
	public BigDecimal getToken_ID() {
		return Token_ID;
	}
	public void setToken_ID(BigDecimal token_ID) {
		Token_ID = token_ID;
	}
	public BigDecimal getUser_ID() {
		return User_ID;
	}
	public void setUser_ID(BigDecimal user_ID) {
		User_ID = user_ID;
	}
	public String getToken_Value() {
		return Token_Value;
	}
	public void setToken_Value(String token_Value) {
		Token_Value = token_Value;
	}
	public String getTokenExpireIn_Time() {
		return TokenExpireIn_Time;
	}
	public void setTokenExpireIn_Time(String tokenExpireIn_Time) {
		TokenExpireIn_Time = tokenExpireIn_Time;
	}
}
