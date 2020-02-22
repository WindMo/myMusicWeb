package com.mo.music.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 验证Token
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Token")
public class VerifyToken {
	
	/**
	 * 传入 Token
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Verify_Token",method=RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Verification(String Token,String User_ID,HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"State\":\""+new TokenUtil().validToken(Token, User_ID)+"\"}]");
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"State\":\"false\"}]");
		}
	}
}
