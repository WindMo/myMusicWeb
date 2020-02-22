package com.mo.music.action;

import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.music.dao.mapper.ArticleReleaseCRUD;
import com.mo.music.dao.mapper.SongInfoCRUD;
import com.mo.music.entity.SongInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 首页
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/HomePage")
public class IndexAction {

	@Autowired
	ArticleReleaseCRUD articleReleaseCRUD;
	@Autowired
	SongInfoCRUD songInfoCRUD;
	
	/**
	 * 设置  分类目录
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Index_Action",method=RequestMethod.POST)
	public @ResponseBody StringBuffer IndexAction(String User_ID,String Token,HttpServletRequest request, HttpServletResponse response) throws IOException{
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
		// 校验链接
		if (User_ID != null && Token != null) {
			if (new Verify_HTTP().Islegal(request)) {
				// 校验Token
				if (new TokenUtil().validToken(Token, User_ID)) {
					return HTMlLabe();
				} else {
					// Token 值校验不通过 判定 当前 Token 不合法
					return new StringBuffer().append("[{\"Error\":\"Current Token illegality\"}]");
				}
			}else{
				// 当前连接异常
				return new StringBuffer().append("[{\"Error\":\"Current connection is unlawful\"}]");
			}
		} else {
			return HTMlLabe();
		}
	}
	
	/* 加载分类头部标HTML签
	 * */
	private StringBuffer HTMlLabe(){
		StringBuffer Type = new StringBuffer("");
		List<SongInfo> list = songInfoCRUD.Conditional_query(" 0=0");
		Set<String> set = new HashSet<>();
		// 查出 Type 总数
		for (SongInfo info : list) {
			if (info.getSong_Type() != null && !set.contains(info.getSong_Type())) {
				set.add(info.getSong_Type());
				Type = Type.append("<li class=\"filter-type-drop-list-item\">"
						+ "<label class=\"filter-drop-checkbox-label\" data-classname=\"Song_Type\" data-item=\""
						+ info.getSong_Type() + "\" onclick=\"Classification(this)\">" + info.getSong_Type() + "</label></li>");
			}
		}
		// 清空StringBuffer
		StringBuffer Genre = new StringBuffer("");
		Set<String> set2 = new HashSet<>();
		// 查出所有 Genre
		for (SongInfo info : list) {
			if (info.getSong_Genre() != null && !set.contains(info.getSong_Genre())) {
				set2.add(info.getSong_Genre());
				Genre = Genre.append("<li class=\"filter-type-drop-list-item\">"
						+ "<label class=\"filter-drop-checkbox-label\" data-classname=\"Song_Genre\" data-item=\""
						+ info.getSong_Genre() + "\" onclick=\"Classification(this)\">" + info.getSong_Genre() + "&nbsp&nbsp&nbsp/"+songInfoCRUD.Classification_conditions_Total_Number(" Song_Genre = \""+info.getSong_Genre()+"\" ")+"</label></li>");
			}
		}
		// 清空StringBuffer
		StringBuffer Artist = new StringBuffer("");
		// 查出所有的 Artist
		Set<String> set3 = new HashSet<>();
		for (SongInfo info : list) {
			if (info.getSong_Artists() != null && !set.contains(info.getSong_Artists())) {
				set3.add(info.getSong_Artists());
				Artist = Artist.append("<li class=\"filter-type-drop-list-item\">"
						+ "<label class=\"filter-drop-checkbox-label\" data-classname=\"Song_Artists\" data-item=\""
						+ info.getSong_Artists() + "\" onclick=\"Classification(this)\">" + info.getSong_Artists() + "</label></li>");
			}
		}

		// 清空StringBuffer
		StringBuffer Label = new StringBuffer("");
		// 查出所有的 Label
		Set<String> set4 = new HashSet<>();
		for (SongInfo info : list) {
			if (info.getSong_Label() != null && !set.contains(info.getSong_Label())) {
				set4.add(info.getSong_Label());
				Label = Label.append("<li class=\"filter-type-drop-list-item\">"
						+ "<label class=\"filter-drop-checkbox-label\" data-classname=\"Song_Label\" data-item=\""
						+ info.getSong_Label() + "\" onclick=\"Classification(this)\">" + info.getSong_Label() + "</label></li>");
			}
		}
		// 拼接 HTML 字符串
		StringBuffer buffer = new StringBuffer("");
		buffer = buffer.append("<div class=\"filter-page-top\">" + "<div class=\"filters\">"
				+ "<div class=\"filter-parent filter-type-parent filter-standard-parent\">"
				+ "<a href=\"#\" class=\"filter-link filter-type-link\">Type</a>"
				+ "<div class=\"filter-drop filter-type-drop\">"
				+ "<a href=\"#\" class=\"filter-drop-reset-link\" onclick=\"ResetAll();\">Reset</a>"
				+ "<ul class=\"filter-type-drop-list\">" + Type + "</ul></div></div>"
				+ "<div class=\"filter-parent filter-released-parent filter-standard-parent\">"
				+ "<a href=\"#\" class=\"filter-link filter-released-link\">Release Date</a>"
				+ "<div class=\"filter-drop filter-released-drop\">"
				+ "<a href=\"#\" class=\"filter-drop-reset-link\" onclick=\"ResetAll();\">Reset</a>"
				+ "<div class=\"filter-released-date-links\">"
				+ "<a href=\"#\" class=\"filter-released-date-link\" data-value=\"today\" data-classname=\"Release Date\" data-item=\"Today\" onclick=\"Classification(this)\">Today</a>"
				+ "<a href=\"#\" class=\"filter-released-date-link\" data-value=\"yesterday\" data-classname=\"Release Date\" data-item=\"Yesterday\" onclick=\"Classification(this)\">Yesterday</a>"
				+ "<a href=\"#\" class=\"filter-released-date-link\" data-value=\"last-7-days\" data-classname=\"Release Date\" data-item=\"Last_7Days\" onclick=\"Classification(this)\">Last 7 Days</a>"
				+ "<a href=\"#\" class=\"filter-released-date-link\" data-value=\"last-30-days\" data-classname=\"Release Date\" data-item=\"Last_30Days\" onclick=\"Classification(this)\">Last 30 Days</a>"
				+ "</div><div class=\"filter-released-date-range\">" + "<div class=\"fieldset-wrapper boxshaw\">"
				+ "<input type=\"text\" class=\"filter-released-date-start picker__input\" placeholder=\"START\""
				+ "readonly=\"\" id=\"P856329471\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-readonly=\"false\" aria-owns=\"P856329471_root\">"
				+ "</div><span class=\"filter-released-date-range-inbetween\">to</span>"
				+ "<div class=\"fieldset-wrapper\">"
				+ "<input type=\"text\" class=\"filter-released-date-end picker__input\" placeholder=\"END\" readonly=\"\""
				+ "id=\"P102947222\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-readonly=\"false\" aria-owns=\"P102947222_root\">"
				+ "</div>" + "<a href=\"#\" class=\"filter-release-apply-button\" onclick=\"DateQueryAPI();\">APPLY</a>"
				+ "</div><div id=\"START\" class=\"TimeStyle\" style=\"display: none\"></div><div id=\"END\" class=\"TimeStyle\" style=\"display: none\"></div></div></div>"
				+ "<div class=\"filter-parent filter-genre-parent filter-standard-parent filter-twocol-parent\">"
				+ "<a href=\"#\" class=\"filter-link filter-genre-link\">Genre</a>"
				+ "<div class=\"filter-drop filter-genre-drop\">"
				+ "<a href=\"#\" class=\"filter-drop-reset-link\" onclick=\"ResetAll();\">Reset</a>"
				+ "<ul class=\"filter-genre-drop-list\">" + Genre + "</ul></div></div>"
				+ "<div class=\"filter-parent filter-artists-parent filter-standard-parent filter-twocol-parent\">"
				+ "<a href=\"#\" class=\"filter-link filter-artists-link\">Artists</a>"
				+ "<div class=\"filter-drop filter-artists-drop\">"
				+ "<a href=\"#\" class=\"filter-drop-reset-link\" onclick=\"ResetAll();\">Reset</a>"
				+ "<ul class=\"filter-artists-drop-list\">" + Artist + "</ul></div></div>"
				+ "<div class=\"filter-parent filter-label-parent filter-standard-parent filter-twocol-parent\">"
				+ "<a href=\"#\" class=\"filter-link filter-label-link\">Labels</a>"
				+ "<div class=\"filter-drop filter-label-drop\">"
				+ "<a href=\"#\" class=\"filter-drop-reset-link\" onclick=\"ResetAll();\">Reset</a>"
				+ "<ul class=\"filter-label-drop-list\">" + Label + "</ul></div></div>"
				+ "<a href=\"#\" class=\"filter-reset-all-link\" onclick=\"ResetAll();\">Reset all</a>"
				+ "<a href=\"#\" class=\"filter-reset-all-link\" onclick=\"packDownload();\">Download</a>"
				+ "</div></div>");
		System.gc();
		return buffer;
	}
	
	/**
	 * 加载  首页   头部
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Home_header", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Classification_conditions_Total_Number(HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 取出首页菜单名
			return new Transformations_JSON().List_Transformations_JSON(articleReleaseCRUD.articleInfoInquire());
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
}
