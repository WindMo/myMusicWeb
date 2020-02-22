package com.mo.music.action;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.ToolClass.paging.PageBean;
import com.mo.ToolClass.paging.PageData;
import com.mo.music.dao.mapper.HistoricalDownloadCRUD;
import com.mo.music.dao.mapper.SongInfoCRUD;
import com.mo.music.entity.HistoricalDownload;
import com.mo.music.entity.SongInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 用户的历史下载/收藏信息
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Historical_Download")
public class HistoricalDownloadAction {

	@Autowired
	HistoricalDownloadCRUD historicalDownloadCRUD;
	@Autowired
	SongInfoCRUD songInfoCRUD;

	/**
	 * 我的/历史 下载接口
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/My_Download", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray My_Download(String User_ID, String Token,String Page,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			if(new TokenUtil().validToken(Token, User_ID)){
				
				try {
					Integer.valueOf(Page);
					if("".equals(Page)|| Page==null){
						Page = "1";
					}
					PageBean PageBean = new PageBean(Integer.parseInt(Page),30);
					
					// 记录页数 和 用户ID
					HistoricalDownload download = new HistoricalDownload();
					download.setUser_ID(new BigDecimal(User_ID));
					download.setSong_ID(new BigDecimal(new PageData().Panging(PageBean)));
					List<HistoricalDownload> downloads = new ArrayList<>();
					downloads.add(download);
					
					
					// 查询出所有歌曲ID
					List<HistoricalDownload> downloads2 = historicalDownloadCRUD.myDownloadInquire(downloads);
					List<SongInfo> song_Infos = songInfoCRUD.queryDownloadInfo(downloads2);
					
					
//					List<SongInfo> song_Infos = new Song_InfoQuery().Conditional_query(" Song_ID in (select Song_ID from historical_download where User_ID = "+User_ID+") "+new PageData().PangingSQL(PageBean)+"");
					if(song_Infos.isEmpty()){
						return new Transformations_JSON()
								.String_Transformations_JSON("[{\"Error\":\"You haven't downloaded anything yet\"}]");
					}else{
						return new Transformations_JSON()
								.List_Transformations_JSON(song_Infos);
					}
				} catch (Exception e) {
					e.printStackTrace();
					return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"The number of pages is positive integer\"}]");
				}

			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 我的下载  数量
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/My_DownloadCount", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray My_DownloadCount(String User_ID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)&&User_ID!=null) {
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"number\":\""+historicalDownloadCRUD.toTal(" User_ID = "+User_ID+" ")+"\"}]");
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 收藏的数量
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/My_ChartsCount", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray My_ChartsCount(String User_ID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)&&User_ID!=null) {
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"number\":\""+songInfoCRUD.Classification_conditions_Total_Number(" Song_ID in (select Song_ID from user_collection where User_ID = "+User_ID+") ")+"\"}]");
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 我的收藏
	 * @param User_ID
	 * @param Token
	 * @param Page
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/My_Charts", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray My_Charts(String User_ID, String Token,String Page,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			if(new TokenUtil().validToken(Token, User_ID)){
				
				try {
					Integer.valueOf(Page);
					if("".equals(Page)|| Page==null){
						Page = "1";
					}
					PageBean PageBean = new PageBean(Integer.parseInt(Page),30);
					List<SongInfo> song_Infos = songInfoCRUD.Conditional_query(" Song_ID in (select Song_ID from user_collection where User_ID = "+User_ID+") "+new PageData().PangingSQL(PageBean)+"");
					if(song_Infos.isEmpty()){
						return new Transformations_JSON()
								.String_Transformations_JSON("[{\"Error\":\"You haven't collection anything yet\"}]");
					}else{
						return new Transformations_JSON()
								.List_Transformations_JSON(song_Infos);
					}
				} catch (Exception e) {
					e.printStackTrace();
					return new Transformations_JSON().String_Transformations_JSON("[{\"Error\":\"The number of pages is positive integer\"}]");
				}

			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	
}
