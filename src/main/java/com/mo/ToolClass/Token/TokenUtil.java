package com.mo.ToolClass.Token;

import com.mo.ToolClass.Generating_order_number;
import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import com.mo.music.dao.mapper.TokenCRUD;
import com.mo.music.dao.mapper.UserInfoCRUD;
import java.util.Date;
import java.util.List;
import org.apache.commons.lang.time.FastDateFormat;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class TokenUtil implements ApplicationContextAware {

	@Autowired
	static UserInfoCRUD userInfoCRUD;
	@Autowired
	static TokenCRUD tokenCRUD;

	public String getToken(String userId, String date) {
		return Hashing.md5().newHasher().putString(userId, Charsets.UTF_8).putString(date, Charsets.UTF_8).hash()
				.toString();
	}

	public String getToken(String userId, Date date) {
		return Hashing.md5().newHasher().putString(userId, Charsets.UTF_8)
				.putString(new Generating_order_number().getItemID(50), Charsets.UTF_8)
				.putString(getDate(date), Charsets.UTF_8).hash().toString();
	}

	/**
	 * 写入用户ID获取Token
	 * 
	 * @param userId
	 * @return
	 */
	public String getToken(String userId) {
		return Hashing.md5().newHasher().putString(userId, Charsets.UTF_8)
				.putString(new Generating_order_number().getItemID(50), Charsets.UTF_8)
				.putString(getDate(), Charsets.UTF_8).hash().toString();
	}

	/**
	 * 校验当前 Token 需要用到数据库
	 * 
	 * @param token
	 * @param userId
	 * @return
	 */
	public boolean validToken(String token, String userId) {
		// 如果从数据库中取不到值，直接返回false
		boolean TokenIsEmpty = false;
		if(token!=null||userId!=null){
			List<com.mo.music.entity.Token> list = tokenCRUD.Find_CurrentToken(userId);
			// 从数据库中获取userid对应的Token
			for (com.mo.music.entity.Token token2 : list) {
				// 获取的Token值与传过来的Token值是否一致
				if (token2.getToken_Value().equals(token)) {
					TokenIsEmpty = true;
				}
			}
		}
		return TokenIsEmpty;
	}
	
	/**
	 * 校验Token 同时  校验  是否是管理员
	 * @param token
	 * @param userId
	 * @return
	 */
	public boolean validToken_admin(String token, String userId) {
		// 如果从数据库中取不到值，直接返回false
		boolean TokenIsEmpty = false;
		if(token!=null||userId!=null){
			List<com.mo.music.entity.Token> list = tokenCRUD.Find_CurrentToken(userId);
			// 从数据库中获取userid对应的Token
			for (com.mo.music.entity.Token token2 : list) {
				// 获取的Token值与传过来的Token值是否一致
				if (token2.getToken_Value().equals(token)) {
					if(!userInfoCRUD.According_toUser_Info(" User_ID = '"+userId+"' and Is_Administrators = 'Y' ").isEmpty()){
						TokenIsEmpty = true;
					}
				}
			}
		}
		return TokenIsEmpty;
	}

	public String getDate() {
		Date date = new Date(System.currentTimeMillis());
		return FastDateFormat.getInstance("yyyyMMddHH").format(date);
	}

	public String getDate(Date now) {

		return FastDateFormat.getInstance("yyyyMMddHH").format(now);
	}

	public String getNextHour() {
		Date date = new Date(System.currentTimeMillis() + 60 * 60 * 2000);

		return FastDateFormat.getInstance("yyyyMMddHH").format(date);
	}

	public String getNextHour(Date now) {
		Date date = new Date(now.getTime() + 60 * 60 * 2000);

		return FastDateFormat.getInstance("yyyyMMddHH").format(date);
	}

	public static void main(String[] args) {

		Date now = new Date();

		String Token = new TokenUtil().getToken("135", now);
		System.out.println("getToken(String userId, String date) : " + Token);
		System.out.println();

		System.out.println(" String getToken(String userId) : " + new TokenUtil().getToken("135"));
		System.out.println();

		System.out.println("String getDate() : " + new TokenUtil().getDate());
		System.out.println();
		System.out.println(" String getDate(Date now) : " + new TokenUtil().getDate(now));
		System.out.println();

		System.out.println("getNextHour(Date now) : " + new TokenUtil().getNextHour(now));
		System.out.println();
		System.out.println("getNextHour() : " + new TokenUtil().getNextHour());
		System.out.println();

		System.out.println("validToken(String token, String userId) : " + new TokenUtil().validToken(Token, "135"));
		System.out.println();

	}


	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		this.userInfoCRUD = applicationContext.getBean(UserInfoCRUD.class);
		this.tokenCRUD = applicationContext.getBean(TokenCRUD.class);
	}
}
