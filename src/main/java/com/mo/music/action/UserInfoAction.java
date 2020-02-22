package com.mo.music.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.GetTodayTime;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.ToolClass.paging.PageBean;
import com.mo.ToolClass.paging.PageData;
import com.mo.music.dao.mapper.MemberInfoCRUD;
import com.mo.music.dao.mapper.TokenCRUD;
import com.mo.music.dao.mapper.UserCollectionCRUD;
import com.mo.music.dao.mapper.UserInfoCRUD;
import com.mo.music.entity.MemberInfo;
import com.mo.music.entity.Token;
import com.mo.music.entity.UserCollection;
import com.mo.music.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 用户登陆的action类
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/UserInfo")
public class UserInfoAction {

	@Autowired
	TokenCRUD tokenCRUD;
	@Autowired
	UserInfoCRUD userInfoCRUD;
	@Autowired
	MemberInfoCRUD memberInfoCRUD;
	@Autowired
	UserCollectionCRUD collectionCRUD;
	@Autowired
	TokenUtil tokenUtil;

	/**
	 * 用户登陆
	 * @param UserName
	 * @param Password
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Userlogin",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Login_Action(@RequestParam("UserName") String UserName,
			@RequestParam("Password") String Password, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			// 判断用户名是否存在
			if (userInfoCRUD.UserName_IsEmpty(UserName)) {
				UserInfo info = new UserInfo();
				info.setUser_Name(UserName);
				info.setUser_Password(Password);
				// 用户名已存在判断用户名与密码是否匹配
				List<UserInfo> infos = userInfoCRUD.UserloginInfo_Inquire(info);
				if (infos.isEmpty()) {
					// 不匹配
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Mismatch of Username or Password"+"}]");
				} else {
					// 匹配成功
					String tokenStr = "";
					// 获取当前时间
					String CurrentTime = new GetTodayTime().GetNetworkTodayTime("yyyy-MM-dd HH:mm:ss");
					//获取用户ID
					for(UserInfo user_Info : infos){
						// 判断当前用户ID是否存在 Token
						List<com.mo.music.entity.Token> list = tokenCRUD.Find_CurrentToken(String.valueOf(user_Info.getUser_ID()));
						if(list.isEmpty()){
							// 如果不存在就创建一个Token
							// 保存  生成的Token

							Token token = new Token();
							token.setUser_ID(user_Info.getUser_ID());
							token.setToken_Value(tokenUtil.getToken(String.valueOf(user_Info.getUser_ID())));
							tokenStr = tokenCRUD.Token_add(token);
						}else{
							tokenStr = tokenUtil.getToken(String.valueOf(user_Info.getUser_ID()));
							// 存在就修改当前Token
							for(com.mo.music.entity.Token token2 : list){
								// 校验是否在有效期之内
								// 现在的时间  - Token有效时间   >0  的 判定为  Token已过期
								if(Integer.valueOf(new GetTodayTime().GetNetworkTodayTime("yyyyMMddHH"))-Integer.valueOf(token2.getTokenExpireIn_Time())>0){
									token2.setTokenExpireIn_Time(tokenUtil.getNextHour());
								}
								// 修改当前Token
								token2.setToken_Value(tokenStr);
								tokenCRUD.Modify_CurrentToken(token2);
							}
						}
						// 查找该用户是否是会员
						List<MemberInfo> member_Infos = memberInfoCRUD
								.accordingToUserIDInquire(user_Info.getUser_ID());
						for (MemberInfo MemberInfo : member_Infos) {
							// 存在会员信息则判断该会员是否到期
							// 当前时间 减 会员结束时间 return false 代表会员已经到期
							if (new GetTodayTime().TwoDateIntervalDays(CurrentTime, MemberInfo.getExpiry_Time(),
									"yyyy-MM-dd HH:mm:ss") >= 0) {
								memberInfoCRUD.memberInfoDelete(MemberInfo.getMember_ID(),String.valueOf(MemberInfo.getUser_ID()));
							}
						}
					}
					
					// 返回  Token Token有效期   UserInfo
					return new Transformations_JSON().String_Transformations_JSON("[{"+"Token"+":[{"+"Token"+":"+"" + tokenStr
							+ ""+","+"TokenExpireIn_Time"+":"+"" + tokenUtil.getNextHour()
							+ ""+"}],"+"UserInfo"+":" + new Transformations_JSON().List_Transformations_JSON(infos) + "}]");
				}
			} else {
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"User Name It does not exist."+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 创建一个用户
	 * @param UserName
	 * @param Password
	 * @param User_Email
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Create_Account",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Create_Account_Action(@RequestParam("UserName") String UserName,
			@RequestParam("Password") String Password, @RequestParam("User_Email") String User_Email,
			@RequestParam("User_Sex") String User_Sex, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
		// 验证 链接
		if(new Verify_HTTP().Islegal(request)){
			UserInfo UserInfo = new UserInfo();
			UserInfo.setUser_Name(UserName);
			UserInfo.setUser_Password(Password);
			UserInfo.setUser_Image("/static/MusicStyle/images/artist-default-1x1.jpg");
			UserInfo.setUser_Sex(User_Sex);
			UserInfo.setIs_Administrators("N");
			UserInfo.setUser_Email(User_Email);
			List<UserInfo> list = new ArrayList<UserInfo>();
			list.add(UserInfo);
			if(userInfoCRUD.Create_Account(list)){
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"User creation Success"+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"User creation failure"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 判断User_Name是否存在
	 * @param UserName
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/UserName_IsEmpty",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray UserName_IsEmpty(@RequestParam("UserName") String UserName,HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 验证 链接
		if(new Verify_HTTP().Islegal(request)){
			//判断User_Email是否存在
			if(userInfoCRUD.UserName_IsEmpty(UserName)){
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"The username has already existed"+","+"IsEmpty"+":"+"true"+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"User name does not exist"+","+"IsEmpty"+":"+"false"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"State"+":"+"Current connection is unlawful"+","+"IsEmpty"+":"+"false"+"}]");
		}
	}
	
	/**
	 * 判断User_Email是否存在
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/UserEmail_IsEmpty",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray UserEmail_IsEmpty(@RequestParam("User_Email") String User_Email,HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证 链接
		if(new Verify_HTTP().Islegal(request)){
			//判断User_Email是否存在
			if(userInfoCRUD.UserName_IsEmpty(User_Email)){
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"This e-mail mailbox has already existed"+","+"IsEmpty"+":"+"true"+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"This electronic mailbox does not exist"+","+"IsEmpty"+":"+"false"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"State"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	
	
	/**
	 * 根据用户ID查询 用户信息
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/UserInfo_Inquire",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray User_Inquire_Action(String User_ID,String Token,HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证 链接
		if(new Verify_HTTP().Islegal(request)){
			// 用户名不是空
			if(User_ID!=null&&Token!=null){
				// 校验Token
				if(tokenUtil.validToken(Token, User_ID)){
					List<UserInfo> infos = userInfoCRUD.According_toUserID(User_ID);
					if(infos.isEmpty()){
						return new Transformations_JSON()
								.String_Transformations_JSON("[{"+"Error"+":"+"User ID does not exist"+"}]");
					}else{
						return new Transformations_JSON().List_Transformations_JSON(infos);
					}
				}else{
					// Token 校验不通过
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
				}
			}else{
				// 用户名是空的
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"The user has no landing"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 忘记修改密码接口
	 * @param Latest_Cipher
	 * @param User_ID
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/Modify_Password",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Modify_Password_Action(
			@RequestParam("Latest_Cipher") String Latest_Cipher, @RequestParam("User_ID") String User_ID,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			//修改用户密码
			UserInfo UserInfo = new UserInfo();
			UserInfo.setUser_ID(new BigDecimal(User_ID));
			UserInfo.setUser_Password(Latest_Cipher);
			//判断密码是否修改成功
			if(userInfoCRUD.Modify_Password(UserInfo)){
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"true"+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"false"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 用户 页面修改密码
	 * @param OldPassword 旧密码
	 * @param NewPassword 新密码
	 * @param User_ID     用户ID
	 * @param Token       用户Token
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/User_PasswordModify",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray User_PasswordModify(String OldPassword, String NewPassword,
			String User_ID, String Token, HttpServletRequest request, HttpServletResponse response)
			throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			// 验证Token
			if(tokenUtil.validToken(Token, User_ID)){
				// 判断原密码
				if(userInfoCRUD.According_toUser_Info(" User_Password = '"+OldPassword+"' ").isEmpty()){
					// 原密码 错误
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Original password error"+"}]");
				}else{
					// 更新密码
					UserInfo UserInfo = new UserInfo();
					UserInfo.setUser_ID(new BigDecimal(User_ID));
					UserInfo.setUser_Password(NewPassword);
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"State"+":"+""+userInfoCRUD.Modify_Password(UserInfo)+""+"}]");
				}
			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	
	/**
	 * 修改用户信息接口
	 * @param Image_URL
	 * @param User_Sex
	 * @param User_Job
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/Modify_UserInfo")
	public @ResponseBody net.sf.json.JSONArray Modify_UserInfo_Action(
			@RequestParam("Image_URL") String Image_URL,@RequestParam("User_Sex") String User_Sex,
			@RequestParam("User_Job") String User_Job,@RequestParam("User_ID") String User_ID,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			//配置用户信息
			UserInfo UserInfo = new UserInfo();
			UserInfo.setUser_Image(Image_URL);
			UserInfo.setUser_Sex(User_Sex);
			UserInfo.setUser_Job(User_Job);
			UserInfo.setUser_ID(new BigDecimal(User_ID));
			//判断用户信息是否修改成功
			if(userInfoCRUD.Modify_UserInfo(UserInfo)){
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"true"+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"false"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 我的收藏
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/My_Collection")
	public @ResponseBody net.sf.json.JSONArray My_Collection_Action(String User_ID,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		List<UserCollection> collection = collectionCRUD.My_CollectionInquire(User_ID);
		//判断是否能查询到值
		if(collection.isEmpty()){
			String str = "[{"+"Error"+":"+"该用户没有收藏记录"+"}]";
			return new Transformations_JSON()
					.String_Transformations_JSON(str);
		}else{
			return new Transformations_JSON().List_Transformations_JSON(collection);
		}
	}
	
	/**
	 * 删除用户收藏
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/Delete_UserCollection", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Delete_UserCollection(String User_ID,String Token,String Song_ID,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(tokenUtil.validToken(Token, User_ID)){
				
				BigDecimal CollectionID = new BigDecimal("0");
				for(UserCollection collection : collectionCRUD.My_CollectionInquire(User_ID)){
					// 拿到收藏ID
					if(collection.getSong_ID().compareTo(new BigDecimal(Song_ID))==0){
						CollectionID = collection.getCollection_ID();
					}
				}
				System.out.println("===============》 "+CollectionID);
				return new Transformations_JSON().String_Transformations_JSON("[{"+"Error"+":"+""+collectionCRUD.Delete_UserCollection(CollectionID)+""+"}]");
				
			}else{
				String str = "[{"+"Error"+":"+"Current Token illegality"+"}]";
				return new Transformations_JSON()
						.String_Transformations_JSON(str);
			}
		}else{
			String str = "[{"+"Error"+":"+"Current connection is unlawful"+"}]";
			return new Transformations_JSON()
					.String_Transformations_JSON(str);
		}
	}
	
	/**
	 * 批量删除用户收藏
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/BatchDelete_UserCollection", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray BatchDelete_UserCollection(String User_ID,String Token,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(tokenUtil.validToken(Token, User_ID)){
				return new Transformations_JSON().String_Transformations_JSON("[{"+"Error"+":"+""+collectionCRUD.BatchDelete_UserCollection(User_ID)+""+"}]");
			}else{

				String str = "[{"+"Error"+":"+"Current Token illegality"+"}]";
				return new Transformations_JSON()
						.String_Transformations_JSON(str);
			}
		}else{
			String str = "[{"+"Error"+":"+"Current connection is unlawful"+"}]";
			return new Transformations_JSON()
					.String_Transformations_JSON(str);
		}
	}
	
	
	/**
	 * 用户总数
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/User_InfoNumberInquire",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray User_InfoNumberInquire(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"OK"+","+"number"+":"+userInfoCRUD.User_InfoNumberInquire()+"}]");
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	
	/**
	 * 用户概览
	 * @param User_ID   管理员ID
	 * @param Token     管理员Token
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/User_overview",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray User_overview_Action(String User_ID,String Token,String Page,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			// 验证 Token && 管理员
			if (tokenUtil.validToken_admin(Token, User_ID)) {
				// 查询会员信息
				try {
					Integer.valueOf(Page);
					if("".equals(Page)|| Page==null){
						Page = "1";
					}
					PageBean PageBean = new PageBean(Integer.parseInt(Page),30);
					// 定义角色
					List<UserInfo> user_Infos = userInfoCRUD.According_toUser_Info(" 0=0 " + new PageData().PangingSQL(PageBean));
					for(UserInfo user_Info :  user_Infos){
						if(user_Info.getIs_Administrators()==null){
							user_Info.setIs_Administrators("");
						}
						if(user_Info.getIs_Administrators().equals("Y")){
							user_Info.setUser_Job("管理员");
						}else{
							user_Info.setUser_Job("用户");
							// 验证是不是管理员
							for(MemberInfo member_Info : memberInfoCRUD.accordingToUserIDInquire(user_Info.getUser_ID())){
								if(user_Info.getUser_ID().compareTo(member_Info.getUser_ID())==0){
									// 会员表中的用户
									user_Info.setUser_Job("会员");
								}
							}
						}
					}
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"errMsg"+":"+"OK"+","+"user_info"+":"+new Transformations_JSON().List_Transformations_JSON(user_Infos)+","+"Size"+":"+""+user_Infos.size()+""+"}]");
			
				} catch (Exception e) {
					e.printStackTrace();
					return new Transformations_JSON().String_Transformations_JSON("[{"+"errMsg"+":"+"The number of pages is positive integer"+"}]");
				}
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"Current Token illegality"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 用户搜索
	 * @param User_ID
	 * @param Token
	 * @param keyword
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/UserSearch",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray UserSearch(String User_ID,String Token,String keyword,HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(tokenUtil.validToken_admin(Token, User_ID)){
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"OK"+","+"user_info"+":"+new Transformations_JSON()
								.List_Transformations_JSON(userInfoCRUD
										.According_toUser_Info(" User_ID = '"+keyword+"' or User_Name = '"+keyword+"' or User_Email = '"+keyword+"'"))+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"Current Token illegality"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 
	 * 删除用户
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/Delete_user",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Delete_user(String Administrator_ID,String Token,String User_ID,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			// 验证 Token && 管理员
			if (tokenUtil.validToken_admin(Token, Administrator_ID)) {
				if(userInfoCRUD.Delete_User(User_ID)){
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"errMsg"+":"+"OK"+"}]");
				}else{
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"errMsg"+":"+"Database deletion failure"+"}]");
				}
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"Current Token illegality"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
}
