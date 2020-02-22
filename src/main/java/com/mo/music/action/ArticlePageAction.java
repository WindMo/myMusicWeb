package com.mo.music.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.music.dao.mapper.ArticleReleaseCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 文章页面
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Article_Page")
public class ArticlePageAction {

	@Autowired
	ArticleReleaseCRUD articleReleaseCRUD;
	
	@RequestMapping("/Article")
	public ModelAndView Article(String article_name,HttpServletRequest request, HttpServletResponse response) throws IOException{
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
		ModelAndView ArticlePage = new ModelAndView("/ArticlePage");
		if(new Verify_HTTP().Islegal(request)){
			ArticlePage.addObject("article_content",new Transformations_JSON().List_Transformations_JSON(articleReleaseCRUD.accordingToArticleName(article_name)));
		}else{
			ArticlePage.addObject("article_content","[{\"error\":\"Current connection is unlawful\"}]");
		}
		return ArticlePage;
	}
	
	@RequestMapping("/Article_Conn")
	public @ResponseBody net.sf.json.JSONArray Article_Conn(String article_name,HttpServletRequest request, HttpServletResponse response) throws IOException{
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			return new Transformations_JSON().List_Transformations_JSON(articleReleaseCRUD.accordingToArticleName(article_name));
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	
	
}
