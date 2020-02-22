package com.mo.music.action.backstage;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.ToolClass.paging.PageBean;
import com.mo.ToolClass.paging.PageData;
import com.mo.music.dao.mapper.ArticleReleaseCRUD;
import com.mo.music.dao.mapper.MemberInfoCRUD;
import com.mo.music.dao.mapper.MembershipOrderCRUD;
import com.mo.music.dao.mapper.UserInfoCRUD;
import com.mo.music.entity.MemberInfo;
import com.mo.music.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 管理员页面
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Controller")
public class AdminPage {

	@Autowired
	ArticleReleaseCRUD articleReleaseCRUD;
	@Autowired
	MemberInfoCRUD memberInfoCRUD;
	@Autowired
	UserInfoCRUD userInfoCRUD;
	@Autowired
	MembershipOrderCRUD membershipOrderCRUD;
	/**
	 * 文章 信息
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/List_articles")
	public @ResponseBody net.sf.json.JSONArray List_articles(String User_ID, String Token,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				// 取出全部 文章信息
				return new Transformations_JSON().List_Transformations_JSON(articleReleaseCRUD.articleInfoInquire());
			}else{
				// 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Identity check does not pass\"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 直接返回 后台页面
	 * @return
	 */
	@RequestMapping(value = "/Go_BackstagePage")
	public ModelAndView Go_BackstagePage(){
		ModelAndView ModelAndView = new ModelAndView("/AdminPage/index");
		return ModelAndView;
	}
	
	/**
	 * 进入会员管理系统页面
	 * @return
	 */
	@RequestMapping(value = "/Membership_ManagementSystem",method=RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Membership_ManagementSystem(String User_ID,String Token,String Page,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				try {
					Integer.valueOf(Page);
					if("".equals(Page)|| Page==null){
						Page = "1";
					}
					PageBean PageBean = new PageBean(Integer.parseInt(Page),30);
					List<MemberInfo> member_Infos = memberInfoCRUD.viewAllMemberInfo(new PageData().PangingSQL(PageBean));
					
					// 保存用户名
					List<UserInfo> infos = new ArrayList<>();
					for(MemberInfo member_Info : member_Infos){
						for(UserInfo user_Info : userInfoCRUD.According_toUser_Info(" User_ID = '"+member_Info.getUser_ID()+"' ")){
							infos.add(user_Info);
						}
					}
					
					
					return new Transformations_JSON()
					.String_Transformations_JSON("[{\"MemberInfo\":"+new Transformations_JSON().List_Transformations_JSON(member_Infos)
							+",\"UserInfo\":"+new Transformations_JSON().List_Transformations_JSON(infos)+",\"Size\":\""+member_Infos.size()+"\"}]");
					
				} catch (Exception e) {
					return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"The number of pages is positive integer\"}]");
				}
			} else {
				// 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Identity check does not pass\"}]");
			}
		} else {
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 返回 会员总数
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/Member_Number",method=RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Member_Number(HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"number\":\""+memberInfoCRUD.memberNumberInquire(" 0=0 ")+"\"}]");
			
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 进入会员编辑页面
	 * @return
	 */
	@RequestMapping(value = "/Entering_membership_edit")
	public ModelAndView Membership_EditorsPage(String Member_ID,String User_Email,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		ModelAndView modelAndView = new ModelAndView("/AdminPage/members_editors/members_editors");
		//根据ID查询会员
		for(MemberInfo member_Info : memberInfoCRUD.accordingToMemberIDInquire(Member_ID)){
			modelAndView.addObject("Opening_Time",member_Info.getOpening_Time());
			modelAndView.addObject("Expiry_Time",member_Info.getExpiry_Time());
			modelAndView.addObject("Member_Type",member_Info.getMember_Type());
			modelAndView.addObject("Member_ID",Member_ID);
		}
		return modelAndView;
	}
	
	/**
	 * 显示系统订单
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/Order_ManagementSystem",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Order_ManagementSystem(String User_ID,String Token,
			String Page,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken(Token, User_ID)){
				try {
					Integer.valueOf(Page);
					if("".equals(Page)|| Page==null){
						Page = "1";
					}
					PageBean PageBean = new PageBean(Integer.parseInt(Page),30);
					// 全部订单信息
					return new Transformations_JSON().List_Transformations_JSON(memberInfoCRUD.viewAllMemberInfo(new PageData().PangingSQL(PageBean)));
				} catch (Exception e) {
					return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"The number of pages is positive integer\"}]");
				}
			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 返回订单总数
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/Order_Number",method=RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Order_Number(HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"number\":\""+membershipOrderCRUD.orderNumber("")+"\"}]");
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 验证 是否为管理员
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/Verifying_administrator",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Verifying_administrator(String User_ID,String Token,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken(Token, User_ID)){
				if(userInfoCRUD.According_toUser_Info(" User_ID = '"+User_ID+"' and Is_Administrators = 'Y' ").isEmpty()){
					// 用户 不是 管理员
					return new Transformations_JSON()
							.String_Transformations_JSON("[{\"Error\":\"The user is not an administrator\"}]");
				}else{
					return new Transformations_JSON()
							.String_Transformations_JSON("[{\"State\":\"success\"}]");
				}
			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
}
