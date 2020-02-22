package com.mo.music.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.EncryptionAlgorithm.MD5Util;
import com.mo.ToolClass.Generating_order_number;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.ToolClass.mailbox.MailUtil;
import com.mo.music.dao.mapper.UserInfoCRUD;
import com.mo.music.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 邮箱验证
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/EMail")
public class MailVerificationAction {

	@Autowired
	UserInfoCRUD userInfoCRUD;

	/**
	 * 定义邮件发送类
	 * 传入用户的Email地址
	 * 发送验证码
	 * @param Email_Address
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Mailbox_Verification",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Mailbox_Verification_Action(@RequestParam("Email_Address") String Email_Address,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(Email_Address.contains("@")){
				//生成  6  位数随机邮箱验证码
				String Verification_Code = new Generating_order_number().getItemID(7);
				
				//调用邮箱发送类  地址   标题    内容
				if(new MailUtil().SendMail(Email_Address,"验证邮件","尊敬的用户您好，您的验证码是：  " + Verification_Code + "   请勿告诉别人！！")){
					return new Transformations_JSON()
							.String_Transformations_JSON("[{\"State\":\"true\",\"Verification_Code\":\""+new MD5Util().encode(Verification_Code+"Verification_Code")+"\"}]");
				}else{
					return new Transformations_JSON()
							.String_Transformations_JSON("[{\"State\":\"false\",\"Verification_Code\":\"\"}]");
				}
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"State\":\"false\",\"Verification_Code\":\"\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 向用户发送新的密码
	 * @param Email_Address
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Forget_password",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Forget_password_Action(@RequestParam("Email_Address") String Email_Address,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			// 查看  邮件地址  是否  存在
			if(userInfoCRUD.UserName_IsEmpty(Email_Address)){
				// 根据用户邮箱查询用户信息				
				for(UserInfo user_Info : userInfoCRUD.According_toUser_Info(" User_Email = '"+Email_Address+"'")){
					user_Info.setUser_Password(new Generating_order_number().getItemID(10));
					userInfoCRUD.Modify_Password(user_Info);
					// 向用户发送  信息
					return new Transformations_JSON()
							.String_Transformations_JSON("[{\"Success\":\""+new MailUtil().SendMail(Email_Address,"重置密码","尊敬的用户您好\n您的用户名是：  " + user_Info.getUser_Name() + "\n"
									+ "您的新密码是：  "+user_Info.getUser_Password())+"\"}]");
				}
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"No information was found\"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"This electronic mailbox does not exist\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
}
