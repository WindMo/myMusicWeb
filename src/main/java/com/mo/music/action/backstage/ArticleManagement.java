package com.mo.music.action.backstage;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.music.dao.mapper.ArticleReleaseCRUD;
import com.mo.music.entity.ArticleRelease;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 文章管理
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Article_management")
public class ArticleManagement {


	@Autowired
	ArticleReleaseCRUD articleReleaseCRUD;

	/**
	 * 根据ID加载文章编辑页面
	 * @param Article_ID 文章ID
	 * @return
	 */
	@RequestMapping(value = "/Load_ArticleEdit")
	public ModelAndView Load_ArticleEdit(String Article_ID,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		ModelAndView ModelAndView = new ModelAndView("/AdminPage/article_edit/Article_edit");
		ModelAndView.addObject("Article_ID",Article_ID);
		// 根据 Article_ID 查找相关信息
		for(ArticleRelease article_Release : articleReleaseCRUD.accordingToArticleID(Article_ID)){
			// 输出文章相关信息
			ModelAndView.addObject("Title",article_Release.getLabel());
			ModelAndView.addObject("Link",article_Release.getFixed_link());
			ModelAndView.addObject("Type",article_Release.getArticle_Status());
			ModelAndView.addObject("Content",article_Release.getArticle_Content());
		}
		return ModelAndView;
	}
	
	/**
	 * 加载所有的文章信息
	 * @return
	 */
	@RequestMapping(value = "/All_ArticleInfo")
	public @ResponseBody StringBuffer Load_AllArticleInfo(HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		//查询文章
		StringBuffer ArticleInfo = new StringBuffer();
		List<ArticleRelease> article_Releases = articleReleaseCRUD.articleInfoInquire();
		if(article_Releases!=null){
			for(ArticleRelease release : article_Releases){
				ArticleInfo = ArticleInfo
						.append("<tr class=\"text-c odd\" role=\"row\"><td class=\"sorting_1\">"+release.getLabel()+"</td>"
								+"<td class=\"text-l\"><u style=\"cursor:pointer\" class=\"text-primary\""
								+"onclick=\"location='"+release.getFixed_link()+"'\" title=\"固定链接\">"
								+release.getFixed_link()+"</u></td><td>"+release.getArticle_Status()+"</td>"
								+"<td>"+release.getRelease_Time()+"</td><td class=\"f-14 td-manage\">"
								+"<a style=\"text-decoration:none\" class=\"ml-5\" onclick=\"article_edit('"+release.getArticle_ID()+"')\"  href=\"javascript:;\" title=\"编辑\">"
								+"<i class=\"Hui-iconfont\"></i></a>"
								+"<a style=\"text-decoration:none\" class=\"ml-5\""
								+"onclick=\"article_del('"+release.getArticle_ID()+"')\" href=\"javascript:;\" title=\"删除\">"
								+"<i class=\"Hui-iconfont\"></i></a></td></tr>");
			}
			return ArticleInfo;
		}else{
			return ArticleInfo;
		}
	}
	
	/**
	 * 修改 or 添加   文章信息
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Save_Article",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Save_Article_Action(String Article_ID, String Fixed_link,
			String Article_Status, String Degree_Openness, String Release_Time, String Article_Content, String Label,
			String Position, String Category, String User_ID, String Token, HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 链接
		if(new Verify_HTTP().Islegal(request)){
			// Token
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				
				// 配置相关信息
				ArticleRelease article_Release = new ArticleRelease();
				article_Release.setArticle_Content(Article_Content);
				article_Release.setArticle_Status(Article_Status);
				article_Release.setDegree_Openness(Degree_Openness);
				article_Release.setFixed_link(Fixed_link);
				article_Release.setLabel(Label);
				article_Release.setPosition(Position);
				article_Release.setRelease_Time(Release_Time);
				
				//判断是否是添加文章
				if(Category.equals("Article_add")){
					//调用SQL Add  进行文章的添加操作
					return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+articleReleaseCRUD.addArticleRelease(article_Release)+"\"}]");
				} else {
					//修改文章需要传入  文章ID
					article_Release.setArticle_ID(new BigDecimal(Article_ID));
					
					// 调用SQLUpdate 进行文章的修改
					return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+articleReleaseCRUD.modifyArticle(article_Release)+"\"}]");
				}
				
			}else{
				// 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Identity check does not pass\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 删除文章
	 * @param Article_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Del_Article",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Del_Article_Action(String User_ID,String Token,String Article_ID, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token,User_ID)){
				return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+articleReleaseCRUD.articleInfoDelete(new BigDecimal(Article_ID))+"\"}]");
			}else{
				// 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Identity check does not pass\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 定义 搜索 传入 关键字 
	 * @param keyword
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Article_Retrieval",method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Article_Retrieval(String User_ID,String Token,String keyword, HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				//返回文章搜索结果
				return new Transformations_JSON().List_Transformations_JSON(articleReleaseCRUD.accordingToKeyWord(keyword));
			}else{
				// 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Identity check does not pass\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
}
