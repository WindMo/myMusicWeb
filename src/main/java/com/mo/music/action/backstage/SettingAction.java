package com.mo.music.action.backstage;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.music.dao.mapper.SettingCRUD;
import com.mo.music.entity.Setting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 后台设置
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/BackstageSetting")
public class SettingAction {

	@Autowired
	SettingCRUD settingCRUD;

	/**
	 * 查找 设置
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/IsLandingAuditions")
	public @ResponseBody net.sf.json.JSONArray IsLandingAuditions(HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			boolean state = false;
			for(Setting setting : settingCRUD.IsLandingAuditions()){
				if(setting.getIsLandingAuditions().equals("true")){
					state = true;
				}
			}
			// 查找是否允许用户登陆后试听
			return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+state+"\"}]");
		}else{
			return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 修改设置
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Modify_Setting")
	public @ResponseBody net.sf.json.JSONArray Modify_Setting(String set,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if(new Verify_HTTP().Islegal(request)){
			if(set.equals("true")){
				return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+settingCRUD.Modify_settings("true")+"\"}]");
			}else{
				return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+settingCRUD.Modify_settings("false")+"\"}]");
			}
		}else{
			return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
}
