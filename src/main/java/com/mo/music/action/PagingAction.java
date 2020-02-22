package com.mo.music.action;

import java.io.IOException;
import java.math.BigDecimal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.ToolClass.paging.PageBean;
import com.mo.ToolClass.paging.PageData;
import com.mo.music.dao.mapper.SongInfoCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 分页action
 * 调用分页工具类
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Paging_Action")
public class PagingAction {

	@Autowired
	SongInfoCRUD songInfoCRUD;
	
	/**
	 * 分页 Action
	 * @param Page
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Paging")
	public @ResponseBody net.sf.json.JSONArray ResultSet(@RequestParam("Page") String Page,String User_ID,String Token,HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(Token!=null&&User_ID!=null){
				// 校验Token
				if(!new TokenUtil().validToken(Token, User_ID)){
					return new Transformations_JSON()
							.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
				}
			}
			try {
				Integer.valueOf(Page);
				if("".equals(Page)|| Page==null){
					Page = "1";
				}
				//调用 分页工具类 PageBean                  传入当前页面数,每页显示的数量
				PageBean PageBean = new PageBean(Integer.parseInt(Page),30);
				
				//调用 分页工具类 PangingSQL 传入PageBean  返回limit SQL语句
				//调用查询dml,传入limit语句,返回歌曲Info
				//最后把歌曲Info转成JSON数据
				return new Transformations_JSON().List_Transformations_JSON(songInfoCRUD.According_tolimit_Inquire(new PageData().PangingSQL(PageBean)));
			} catch (Exception e) {
				return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"The number of pages is positive integer\"}]");
			}
		}else{
			return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 最大的页数
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/MaxPage")
	public @ResponseBody net.sf.json.JSONArray MaxPage(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		//配置跨域访问
		response.setHeader("Access-Control-Allow-Origin", "*");
		
		//返回最大页面数量，传入 每页显示数量 10
		return new Transformations_JSON().String_Transformations_JSON("[{\"MaxPage\":\""+new PageData().TotalPage(new BigDecimal("50"))+"\"}]");
	}
	
	/**
	 * 总的数量
	 * @param Token
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Songs_TotalNumber")
	public @ResponseBody net.sf.json.JSONArray Songs_TotalNumber(String Token,String User_ID,HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 校验链接合法性
		if(new Verify_HTTP().Islegal(request)){
			if(Token!=null&&User_ID!=null){
				//校验Token
				if(new TokenUtil().validToken(Token, User_ID)){
					return new Transformations_JSON().String_Transformations_JSON("[{\"Songs_TotalNumber\":\""+songInfoCRUD.Songs_TotalNumberInquire()+"\"}]");
				}else{
					return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\"The token has failed\"}]");
				}
			}else{
				return new Transformations_JSON().String_Transformations_JSON("[{\"Songs_TotalNumber\":\""+songInfoCRUD.Songs_TotalNumberInquire()+"\"}]");
			}
		}else{
			return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\"Current connection is unlawful\"}]");
		}
	}

}
