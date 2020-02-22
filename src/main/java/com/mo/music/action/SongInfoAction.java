package com.mo.music.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.*;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.calculation.BigDecimalUtils;
import com.mo.ToolClass.paging.PageBean;
import com.mo.ToolClass.paging.PageData;
import com.mo.music.DowloadUtil;
import com.mo.music.dao.mapper.*;
import com.mo.music.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.mo.ToolClass.DeleteFiles;
import com.mo.ToolClass.GeneratingRandom;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.ValidateUtil;
import com.mo.ToolClass.ZipCompressor;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.mo.music.entity.DownloadInfo;
import com.mo.music.entity.HistoricalDownload;
import com.mo.music.entity.MembershipPrice;
import com.mo.music.entity.Result;
import com.mo.music.entity.SongInfo;
import com.mo.music.entity.UserCollection;

@Controller
@RequestMapping(value = "/SongInfo")
public class SongInfoAction {

	@Autowired
	SongInfoCRUD songInfoCRUD;
	@Autowired
	MemberInfoCRUD memberInfoCRUD;
	@Autowired
	DowloadUtil dowloadUtil;
	@Autowired
	HistoricalDownloadCRUD historicalDownloadCRUD;
	@Autowired
	UserCollectionCRUD userCollectionCRUD;
	@Autowired
	DownloadInfoCRUD downloadInfoCRUD;
	@Autowired
	MembershipPriceCRUD priceCRUD;
	@Autowired
	SettingCRUD settingCRUD;


	/**
	 * 根据歌曲ID查询 歌曲信息
	 * 
	 * @param Song_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SongInfo_Inquire")
	public @ResponseBody net.sf.json.JSONArray SongInfoInquire_Action(@RequestParam("Song_ID") String Song_ID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		List<SongInfo> infos = songInfoCRUD.According_toSongID_Inquire(Song_ID);
		if (infos.isEmpty()) {
			return new Transformations_JSON().String_Transformations_JSON("[{"+"Error"+":"+"音乐ID不存在"+"}]");
		} else {
			return new Transformations_JSON().List_Transformations_JSON(infos);
		}
	}

	/**
	 * 定义搜索功能接口 传入关键词Key
	 * 
	 * @param Key
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/SongInfo_Search", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Song_search(String Key, String Page, String User_ID, String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 判定是否登陆
			if (Token != null && User_ID != null) {
				// 校验Token
				if (!new TokenUtil().validToken(Token, User_ID)) {
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
				}
			}
			if (Key != null && Key != "") {
				try {
					Integer.valueOf(Page);
					if ("".equals(Page) || Page == null) {
						Page = "1";
					}
					PageBean PageBean = new PageBean(Integer.parseInt(Page), 30);
					List<SongInfo> infos = songInfoCRUD.According_toKey_Search(Key,
							new PageData().PangingSQL(PageBean));
					if (infos.isEmpty()) {
						return new Transformations_JSON()
								.String_Transformations_JSON("[{"+"Error"+":"+"No search results"+"}]");
					} else {
						return new Transformations_JSON().List_Transformations_JSON(infos);
					}
				} catch (Exception e) {
					e.printStackTrace();
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"The number of pages is positive integer"+"}]");
				}
			} else {
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Key words cannot be empty"+"}]");
			}

		} else {
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 获取搜索后的数量
	 * 
	 * @param Key
	 * @param Token
	 * @param UserID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/The_number_of_search_results", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray The_number_of_search_results(@RequestParam("Key") String Key,
			String Token, String UserID, HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 判定是否登陆
			if (Token != null && UserID != null) {
				// 校验Token
				if (!new TokenUtil().validToken(Token, UserID)) {
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
				}
			}
			return new Transformations_JSON().String_Transformations_JSON(
					"[{"+"ResultsNumber"+":"+"" + songInfoCRUD.The_number_of_search_results(Key) + ""+"}]");
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 获取 试听 地址
	 * 
	 * @param User_ID
	 *            用户ID
	 * @param Token
	 *            用户Token
	 * @param Song_ID
	 *            歌曲ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Get_Linkaddress", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Get_Linkaddress(String User_ID, String Token, String Song_ID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 配置utf-8
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 是否允许不登陆 试听
		if (IsLandingAuditions()) {
			// 用户必须登陆后才能试听
			if (User_ID != null && Token != null && Song_ID != null) {
				// 验证当前Token的合法性
				if (new TokenUtil().validToken(Token, User_ID)) {
					// 判断 referer 防止用户通过粘贴链接
					if (new Verify_HTTP().Islegal(request)) {
						// 试听 返回 文件地址
						return new Transformations_JSON()
								.String_Transformations_JSON(
										"[{"+"State"+":[{"+"State"+":"+"true"+"}],"+"File_Address"+":"
												+ new Transformations_JSON().List_Transformations_JSON(
												songInfoCRUD.According_toSongID_Inquire(Song_ID))
												+ "}]");
					} else {
						// 判定 链接 异常
						return new Transformations_JSON()
								.String_Transformations_JSON("[{"+"State"+":"+"Current connection is unlawful"+"}]");
					}
				} else {
					// Token 值校验不通过 判定 当前 Token 不合法
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"State"+":"+"Current Token illegality"+"}]");
				}
			} else {
				// 警告 你必须先登陆才能试听
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"You have to log in before you hear it"+"}]");
			}
		} else {
			// 执行用户不用登陆也能试听的方法
			// 再次校验Token 校验 不用登陆，还是登陆了的用户
			if (User_ID != null && Token != null && Song_ID != null) {
				// 验证当前Token的合法性
				if (!new TokenUtil().validToken(Token, User_ID)) {
					// Token 值校验不通过 判定 当前 Token 不合法
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"State"+":"+"Current Token illegality"+"}]");
				}
			}
			// 这里 校验Token 只是防止 有其他用户登陆顶号
			// 依旧判断链接是否合法
			if (new Verify_HTTP().Islegal(request)) {
				// 试听 返回 文件地址
				return new Transformations_JSON().String_Transformations_JSON(
						"[{"+"State"+":[{"+"State"+":"+"true"+"}],"+"File_Address"+":" + new Transformations_JSON()
								.List_Transformations_JSON(songInfoCRUD.According_toSongID_Inquire(Song_ID))
								+ "}]");
			} else {
				// 判定 链接 异常
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"Current connection is unlawful"+"}]");
			}
		}
	}

	/**
	 * 获取 下载排行榜 前100名
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getTop", method = RequestMethod.POST)
	public @ResponseBody JSONObject getTop(String User_ID, String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 配置utf-8
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 判定 Token User_ID Song_ID 不为空
		if (User_ID != null && Token != null) {
			// 验证当前Token的合法性
			if (new TokenUtil().validToken(Token, User_ID)) {
				// 获取引用地址,防止用户通过粘贴链接地址获取歌曲的下载地址
				// 判定 Referer 不为空 同时包含 网站域名
				if (new Verify_HTTP().Islegal(request)) {
					return JSON.parseObject(JSONObject.toJSONString(Result.ok(songInfoCRUD.getTop())));
				} else {
					// 判定 链接 异常
					return JSON.parseObject(JSONObject.toJSONString(Result.fail("401","Current connection is unlawful")));
				}
			} else {
				// Token 值校验不通过 判定 当前 Token 不合法
				return JSON.parseObject(JSONObject.toJSONString(Result.fail("401","Current Token illegality")));
			}
		} else {
			// 参数值未空,判断当前用户未登陆
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("You have to log in before you can download it")));
		}
	}

	/**
	 * 获取 下载 地址
	 * 
	 * @param User_ID
	 *            用户ID
	 * @param Token
	 *            用户Token
	 * @param Song_ID
	 *            歌曲ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Get_Downloadaddress")
	public @ResponseBody net.sf.json.JSONArray Get_Downloadaddress(String User_ID, String Token, String Song_ID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 配置utf-8
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 判定 Token User_ID Song_ID 不为空
		if (User_ID != null && Token != null && Song_ID != null) {
			// 验证当前Token的合法性
			if (new TokenUtil().validToken(Token, User_ID)) {
				// 获取引用地址,防止用户通过粘贴链接地址获取歌曲的下载地址
				// 判定 Referer 不为空 同时包含 网站域名
				if (new Verify_HTTP().Islegal(request)) {
					// 拿到用户的会员信息
					String MemberInfo = dowloadUtil.isMember(User_ID);
					if (!MemberInfo.equals("false")) {
						// 判断用户是否具备下载权限 并且进行下载次数 +1
						if (dowloadUtil.isDownloadPermissions(Song_ID, User_ID, MemberInfo)) {
							// 返回 文件 下载 地址
							String downloadAddress = "";
							for (SongInfo SongInfo : songInfoCRUD.According_toSongID_Inquire(Song_ID)) {
								downloadAddress = SongInfo.getSong_DownloadAddress();
							}
							if (downloadAddress == "" || downloadAddress == null) {
								downloadAddress = "There is no download link for this music";
							} else {
								// 添加历史下载信息
								HistoricalDownload doHistorical_Download = new HistoricalDownload();
								doHistorical_Download.setSong_ID(new BigDecimal(Song_ID));
								doHistorical_Download.setUser_ID(new BigDecimal(User_ID));
								historicalDownloadCRUD.addHistoricalDownloadAdd(doHistorical_Download);
							}

							// 修改歌曲的下载量
							List<SongInfo> song = new ArrayList<>();
							SongInfo e = new SongInfo();
							e.setSong_ID(new BigDecimal(Song_ID));
							song.add(e);
							songInfoCRUD.downloadRank(song);

							return new Transformations_JSON()
									.String_Transformations_JSON("[{"+"File_Address"+":"+"" + downloadAddress + ""+"}]");
						} else {
							// 用户不具备对该曲风的音乐的下载权限
							return new Transformations_JSON().String_Transformations_JSON(
									"[{"+"State"+":"+"You don't have the right to download the song of this kind of wind"+"}]");
						}
					} else {
						// 用户必须是会员才能进行下载
						return new Transformations_JSON()
								.String_Transformations_JSON("[{"+"State"+":"+"You have to be a member to download"+"}]");
					}
				} else {
					// 判定 链接 异常
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"State"+":"+"Current connection is unlawful"+"}]");
				}
			} else {
				// Token 值校验不通过 判定 当前 Token 不合法
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"Current Token illegality"+"}]");
			}
		} else {
			// 参数值未空,判断当前用户未登陆
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"State"+":"+"You have to log in before you can download it"+"}]");
		}
	}

	/**
	 * 月度会员收藏下载
	 * 
	 * @param User_ID
	 * @param Song_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/collectionDownload", method = RequestMethod.POST)
	public @ResponseBody JSONObject collectionDownload(String User_ID, String Song_ID,
			String collectionId, HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 配置utf-8
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 校验链接
		if (!new Verify_HTTP().Islegal(request)) {
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("Current connection is unlawful")));
		}

		// 拿到用户的会员信息
		String MemberInfo = dowloadUtil.isMember(User_ID);
		if (MemberInfo.equals("false")) {
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("You have to be a member to download")));
		}

		// 不能超过 10 首歌
		JSONArray jsonArray = JSONArray.parseObject(Song_ID, JSONArray.class);
		if (jsonArray.size() > 10) {
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("最多下载10首")));
		}

		Result result = multiSelectDownload(User_ID, jsonArray.toJSONString(), request, response);
		if (result.getCode().equals(result.FAIL)) {
			return JSON.parseObject(JSONObject.toJSONString(result));
		}

		// 构建 收藏信息
		List<Integer> fileLists = JSONObject.parseArray(jsonArray.toJSONString(), Integer.class);

		List<UserCollection> collections = new ArrayList<>();
		for (Integer inte : fileLists) {
			UserCollection collection = new UserCollection();
			collection.setSong_ID(new BigDecimal(inte));
			collection.setUser_ID(new BigDecimal(User_ID));
			collections.add(collection);
		}

		// 打包成功 删除收藏
		userCollectionCRUD.batchDeletion(collections);

		return JSON.parseObject(JSONObject.toJSONString(result));
	}

	/**
	 * 首页一键下载
	 * 
	 * @param User_ID
	 * @param Song_ID
	 * @param request
	 * @param response
	 * @return/
	 * @throws IOException
	 */
	@RequestMapping(value = "/homeDownload", method = RequestMethod.POST)
	public @ResponseBody JSONObject homeDownload(String User_ID, String Song_ID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		// 配置utf-8
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 校验链接
		if (!new Verify_HTTP().Islegal(request)) {
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("Current connection is unlawful")));
		}

		// 拿到用户的会员信息
		String MemberInfo = dowloadUtil.isMember(User_ID);
		if (MemberInfo.equals("false")) {
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("You have to be a member to download")));
		}

		// 包月会员不可以打包下载
		if (MemberInfo.split("会员生效中")[0].equals("包月")) {
			return JSON.parseObject(JSONObject.toJSONString(Result.fail("您需要升级到季度或者包年会员才能使用该功能")));
		}

		JSONArray array = JSONArray.parseArray(Song_ID);
		System.out.println(array.toJSONString());
		Result result = multiSelectDownload(User_ID, array.toJSONString(), request, response);
		System.out.println(result.getData());

		return JSON.parseObject(JSONObject.toJSONString(result));
	}

	/**
	 * 多选下载
	 * 
	 * @param userId
	 *            用户ID
	 * @param song
	 *            歌曲ID(JSON字符串)
	 * @param request
	 * @param response
	 * @return 歌曲下载链接
	 * @throws IOException
	 */
	public Result multiSelectDownload(String userId, String song, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 用户ID是否为数字
		boolean userIdIsNumeric = ValidateUtil.isNumeric(userId);

		if (!userIdIsNumeric) {
			return Result.fail("用户ID必须为数字");
		}

		// 拿到用户的会员信息
		String MemberInfo = dowloadUtil.isMember(userId);

		if (MemberInfo.equals("false")) {
			// 用户必须是会员才能进行下载
			return Result.fail("You have to be a member to download");
		}

		JSONArray jsonArray = JSONArray.parseObject(song, JSONArray.class);
		try {
			if (jsonArray.isEmpty()) {
				return Result.fail("请勿传入空值");
			}
			List<Integer> fileLists = JSONObject.parseArray(jsonArray.toJSONString(), Integer.class);
			if (fileLists.isEmpty()) {
				return Result.fail("JSON格式不正确");
			}

			// 获取歌曲信息
			List<SongInfo> infos = songInfoCRUD.findMultiple(fileLists);

			// 记录曲风
			List<String> genre = new ArrayList<>();
			for (SongInfo info : infos) {
				if (info.getSong_Genre().equals("套曲") || ValidateUtil.isUrl(info.getSong_DownloadAddress())) {
					break;
				}
				genre.add(info.getSong_Genre());
			}

			// 筛选出不重复的曲风
			List<String> dataGenres = genre.stream().distinct().collect(Collectors.toList());

			if (infos.size() != fileLists.size()) {
				System.out.println("infos.size():" + infos.size());
				System.out.println("fileLists.size():" + fileLists.size());
				return Result.fail("歌曲信息不存在");
			}

			// 获取下载信息
			List<DownloadInfo> download_Infos = downloadInfoCRUD.numberOfDownloads(userId);

			// 记录曲风
			List<String> download = new ArrayList<>();
			for (DownloadInfo info : download_Infos) {
				download.add(info.getGenre_Name());
			}

			// 筛选出不重复的曲风
			List<String> downloadGenres = download.stream().distinct().collect(Collectors.toList());

			// 获取可下载数
			List<MembershipPrice> list = priceCRUD
					.CustomQuery(" `Membership_Name` = '" + MemberInfo.split("会员生效中")[0] + "' ");

			// 查看下载信息中是否缺省曲风
			if (downloadGenres.size() != dataGenres.size()) {
				// 去除重复记录
				List<String> lists = new ArrayList<>();
				HashSet h1 = new HashSet(dataGenres);
				HashSet h2 = new HashSet(downloadGenres);
				h1.removeAll(h2);
				lists.addAll(h1);
				if (lists.size() > 0) {
					// 记录缺省值
					for (String str : lists) {
						DownloadInfo e = new DownloadInfo();
						e.setUser_ID(new BigDecimal(userId));
						e.setGenre_Name(str);
						e.setAll_DownloadNum(list.get(0).getPrice_ID());
						e.setSurplus_Number(new BigDecimal("0"));
						download_Infos.add(e);
						// 新增数据
						downloadInfoCRUD.addDownloadInfo(e);
					}
				}
			}

			// 总的下载数
			BigDecimal totalDownload = new BigDecimal("0");
			for (DownloadInfo info : download_Infos) {
				totalDownload = totalDownload.add(info.getSurplus_Number());
			}

			totalDownload = totalDownload.add(new BigDecimal(infos.size()));

			if (BigDecimalUtils.compare(totalDownload, list.get(0).getDownloads())) {
				System.out.println("totalDownload:" + totalDownload);
				System.out.println("list.get(0).getDownloads():" + list.get(0).getDownloads());
				return Result.fail("You don't have the right to download the song of this kind of wind");
			}

			// 修改剩余数
			for (SongInfo info : infos) {
				for (DownloadInfo download_Info : download_Infos) {
					if (info.getSong_Genre().equals(download_Info.getGenre_Name())) {
						download_Info.setSurplus_Number(download_Info.getSurplus_Number().add(new BigDecimal("1")));
						if (!downloadInfoCRUD.modifyDownloadInfotoID(download_Info)) {
							System.out.println("修改出错,错误ID:" + download_Info.getGenre_ID());
						}
					}
				}

				// 添加历史记录
				if (info.getSong_DownloadAddress() == "" || info.getSong_DownloadAddress() == null
						|| info.getSong_DownloadAddress().length() < 1) {
					return Result.fail(info.getSong_Name() + "This song has no download link");
				} else {
					// 添加历史下载信息
					HistoricalDownload doHistorical_Download = new HistoricalDownload();
					doHistorical_Download.setSong_ID(info.getSong_ID());
					doHistorical_Download.setUser_ID(new BigDecimal(userId));
					if (!historicalDownloadCRUD.addHistoricalDownloadAdd(doHistorical_Download)) {
						System.out.println("历史下载记录添加失败");
					}
				}
			}

			// ZipUtils.configDownloadZip(response, "musicFile.zip");
			downloadGenres.clear();
			downloadGenres = new ArrayList<>();

			for (SongInfo song_Info : infos) {
				if (!ValidateUtil.isUrl(song_Info.getSong_DownloadAddress())) {
					downloadGenres.add(Config.PATHPREFIX + song_Info.getSong_DownloadAddress());
				}
			}

			if (downloadGenres.isEmpty()) {
				return Result.fail("未选定下载歌曲");
			}

			String[] str = new String[downloadGenres.size()];
			downloadGenres.toArray(str);

			// 记录下载量
			songInfoCRUD.downloadRank(infos);

			// 生成随机文件名
			String random = GeneratingRandom.getItemID(10);
			ZipCompressor zc = new ZipCompressor(Config.PATH + random + ".zip");
			zc.compress(str);
			return Result.ok("/MusicFile/fileDownload/" + random + ".zip");
		} catch (Exception e) {
			e.printStackTrace();
			return Result.fail("JSON解析失败"+e.getMessage());
		}
	}

	/**
	 * 是否允许 用户 登陆后才能试听 true 用户必须登陆后才能试听 false 用户不用登陆就能试听
	 * 
	 * @return
	 */
	private boolean IsLandingAuditions() {
		boolean type = false;
		for (Setting setting : settingCRUD
				.IsLandingAuditions()) {
			if (setting.getIsLandingAuditions().equals("true")) {
				type = true;
			}
		}
		return type;
	}

	/**
	 * 定义分类
	 * 
	 * @param item
	 * @param classname
	 * @param UserID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Definition_classification", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Definition_classification(String item, String classname, String UserID,
			String Token, String Page, HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 判定是否登陆
			if (Token != null && UserID != null) {
				// 校验Token
				if (!new TokenUtil().validToken(Token, UserID)) {
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
				}
			}
			// 定义分页
			try {
				Integer.valueOf(Page);
				if ("".equals(Page) || Page == null) {
					Page = "1";
				}
				PageBean PageBean = new PageBean(Integer.parseInt(Page), 30);
				return new Transformations_JSON().List_Transformations_JSON(songInfoCRUD
						.Conditional_query(classname + "="+"" + item + ""+" order by Song_ReleasedTime DESC "
								+ new PageData().PangingSQL(PageBean)));
			} catch (Exception e) {
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"The number of pages is positive integer"+"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 根据日期查询
	 * 
	 * @param START
	 * @param END
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/DateQuery", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray DateQueryAPI(String START, String END, String User_ID, String Token,
			String Page, HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 判定是否登陆
			if (Token != null && User_ID != null) {
				// 校验Token
				if (!new TokenUtil().validToken(Token, User_ID)) {
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
				}
			}
			try {
				// 定义分页
				Integer.valueOf(Page);
				if ("".equals(Page) || Page == null) {
					Page = "1";
				}
				PageBean PageBean = new PageBean(Integer.parseInt(Page), 30);
				// 判断参数是否是日期 同时 开始日期 大于 结束日期
				if (new GetTodayTime().Validation_TimeFormat(START, "yyyy-MM-dd")
						&& new GetTodayTime().Validation_TimeFormat(END, "yyyy-MM-dd")) {
					// 开始日期大于结束日期
					if (new GetTodayTime().DateConversion_to_Milliseconds(START,
							"yyyy-MM-dd") >= new GetTodayTime().DateConversion_to_Milliseconds(END,
									"yyyy-MM-dd")) {
						// 调用 数据库 查询
						return new Transformations_JSON().List_Transformations_JSON(songInfoCRUD
								.Conditional_query(" STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') <= STR_TO_DATE('" + START
										+ "','%Y-%m-%d') and STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') >= STR_TO_DATE('"
										+ END + "','%Y-%m-%d') "
										+ new PageData().PangingSQL(PageBean)));
					} else {
						// 结束日期大于开始日期
						// 调用 数据库 查询
						return new Transformations_JSON().List_Transformations_JSON(songInfoCRUD
								.Conditional_query(
								" STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') >= STR_TO_DATE('" 
								+ START + "','%Y-%m-%d') and STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') <= STR_TO_DATE('" + END + "','%Y-%m-%d') "
										+ new PageData().PangingSQL(PageBean)));
					}
				} else {
					// 不符合日期格式
					return new Transformations_JSON().String_Transformations_JSON("[{"+"Error"+":"+"Non date format"+"}]");
				}
			} catch (Exception e) {
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"The number of pages is positive integer"+"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 给出 分类 结果 总数
	 * 
	 * @param item
	 * @param classname
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Classification_conditions_Total_Number", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Classification_conditions_Total_Number(String item, String classname,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			return new Transformations_JSON()
					.String_Transformations_JSON(
							"[{"+"Result"+":"+""
									+ songInfoCRUD
											.Classification_conditions_Total_Number(classname + "="+"" + item + ""+"")
									+ ""+"}]");
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 时间查询的总数
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Time_Classification_TotalNumber", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Time_Classification_TotalNumber(String START, String END,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {

			if (new GetTodayTime().DateConversion_to_Milliseconds(START,
					"yyyy-MM-dd") >= new GetTodayTime().DateConversion_to_Milliseconds(END,
							"yyyy-MM-dd")) {
				// 调用 数据库 查询
				return new Transformations_JSON().String_Transformations_JSON("[{"+"Result"+":"+""
						+ songInfoCRUD.Classification_conditions_Total_Number(
								" STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') <= STR_TO_DATE('" + START
										+ "','%Y-%m-%d') and STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') >= STR_TO_DATE('"
										+ END + "','%Y-%m-%d') ")
						+ ""+"}]");
			} else {
				// 结束日期大于开始日期
				// 调用 数据库 查询
				return new Transformations_JSON().String_Transformations_JSON("[{"+"Result"+":"+""
						+ songInfoCRUD.Classification_conditions_Total_Number(
								" STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') >= STR_TO_DATE('" + START
										+ "','%Y-%m-%d') and STR_TO_DATE(Song_ReleasedTime,'%Y-%m-%d') <= STR_TO_DATE('"
										+ END + "','%Y-%m-%d') ")
						+ ""+"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 修改歌曲信息
	 * 
	 * @param Song_ID
	 * @param Song_Name
	 * @param Song_Artists
	 * @param Song_Label
	 * @param Song_ReleasedTime
	 * @param Song_Genre
	 * @param Song_Type
	 * @param Song_AuditionAddress
	 * @param Song_DownloadAddress
	 * @param Song_Imge
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Modify_SongInfo", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Modify_SongInfo(String Song_ID, String Song_Name, String Song_Artists,
			String Song_Label, String Song_ReleasedTime, String Song_Genre, String Song_Type,
			String Song_AuditionAddress, String Song_DownloadAddress, String Song_Imge, String User_ID, String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 验证Token
			if (new TokenUtil().validToken_admin(Token, User_ID)) {
				SongInfo song_Info = new SongInfo();
				song_Info.setSong_Artists(Song_Artists);
				song_Info.setSong_AuditionAddress(Song_AuditionAddress);
				song_Info.setSong_DownloadAddress(Song_DownloadAddress);
				song_Info.setSong_Genre(Song_Genre);
				song_Info.setSong_ID(new BigDecimal(Song_ID));
				song_Info.setSong_Imge(Song_Imge);
				song_Info.setSong_Label(Song_Label);
				song_Info.setSong_Name(Song_Name);
				song_Info.setSong_ReleasedTime(Song_ReleasedTime);
				song_Info.setSong_Type(Song_Type);
				return new Transformations_JSON().String_Transformations_JSON(
						"[{"+"State"+":"+"" + songInfoCRUD.Modify_SongInfo(song_Info) + ""+"}]");
			} else {
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 删除 歌曲信息
	 * 
	 * @param Song_ID
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Delete_Song", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Delete_Song(String Song_ID, String User_ID, String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {
			// 验证Token
			if (new TokenUtil().validToken_admin(Token, User_ID)) {
				// 查询歌曲文件地址
				for (SongInfo song_Info : songInfoCRUD.According_toSongID_Inquire(Song_ID)) {
					System.out.println("=================> AuditionAddress文件删除结果"
							+ new DeleteFiles().delFile("/mnt" + song_Info.getSong_AuditionAddress()));
					System.out.println("=================> DownloadAddress文件删除结果"
							+ new DeleteFiles().delFile("/mnt" + song_Info.getSong_DownloadAddress()));
					System.out.println("=================> SongIMG        文件删除结果"
							+ new DeleteFiles().delFile("/mnt" + song_Info.getSong_Imge()));
				}

				return new Transformations_JSON().String_Transformations_JSON(
						"[{"+"State"+":"+"" + songInfoCRUD.Delete_Song(Song_ID) + ""+"}]");
			} else {
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
			}
		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 歌曲 添加
	 * 
	 * @param Song_Name
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Song_Add", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Song_Add(String Song_Name, String Song_Artists, String Song_Label,
			String Song_ReleasedTime, String Song_Genre, String Song_Type, String Song_Address, String Song_Imge,
			String fileType, String FileName, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		// 验证链接
		if (new Verify_HTTP().Islegal(request)) {

			SongInfo info = new SongInfo();
			info.setSong_Name(Song_Name);
			info.setSong_Artists(Song_Artists);
			info.setSong_Label(Song_Label);
			info.setSong_Genre(Song_Genre);
			info.setSong_ReleasedTime(Song_ReleasedTime);
			info.setSong_Type(Song_Type);
			info.setSong_Imge(Song_Imge);
			if (fileType.equals("Auditions")) {
				// 试听是添加文件
				info.setSong_AuditionAddress(Song_Address);
				List<SongInfo> infos = new ArrayList<>();
				infos.add(info);
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"State"+":"+"" + songInfoCRUD.Add_Song(infos) + ""+"}]");
			} else {
				// 下载 就是修改文件
				info.setSong_DownloadAddress(Song_Address);
				// 查找 对应数据
				info.setSong_ID(songInfoCRUD
						.According_toAuditionAddress_Inquire("/MusicFile/Auditions/" + FileName + ""));
				return new Transformations_JSON().String_Transformations_JSON(
						"[{"+"State"+":"+"" + songInfoCRUD.Modify_Downloader(info) + ""+"}]");
			}
		} else {
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 用户点击收藏
	 * 
	 * @param User_ID
	 * @param Token
	 * @param Song_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping(value = "/User_Collection", method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Collection(String User_ID, String Token, String Song_ID,
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 验证 链接
		if (new Verify_HTTP().Islegal(request)) {
			// 验证 Token
			// 判定是否登陆
			if (Token != null && User_ID != null) {
				// 校验Token
				if (new TokenUtil().validToken(Token, User_ID)) {
					// 验证 是否 已经收藏 过
					List<UserCollection> collections = userCollectionCRUD.My_CollectionInquire(User_ID);
					if (collections.isEmpty()) {
						// 没有查到信息 用户第一次进行收藏 直接添加
						UserCollection userCollection = new UserCollection();
						userCollection.setUser_ID(BigDecimal.valueOf(Double.valueOf(User_ID)));
						userCollection.setSong_ID(BigDecimal.valueOf(Double.valueOf(Song_ID)));
						if (userCollectionCRUD.UserCollection_Add(userCollection)) {
							return new Transformations_JSON().String_Transformations_JSON("[{"+"State"+":"+"true"+"}]");
						} else {
							// 添加收藏 失败
							return new Transformations_JSON()
									.String_Transformations_JSON("[{"+"Error"+":"+"Add the collection failure"+"}]");
						}
					} else {
						boolean type = false;
						// 判断用户是否收藏过相同的
						for (UserCollection collection : collections) {
							if (collection.getSong_ID().compareTo(new BigDecimal(Song_ID)) == 0) {
								type = true;
							}
						}
						if (type) {
							// 存在相同的记录
							return new Transformations_JSON()
									.String_Transformations_JSON("[{"+"Error"+":"+"You have already collected it"+"}]");
						} else {
							// 成功
							UserCollection userCollection = new UserCollection();
							userCollection.setUser_ID(BigDecimal.valueOf(Double.valueOf(User_ID)));
							userCollection.setSong_ID(BigDecimal.valueOf(Double.valueOf(Song_ID)));
							if (userCollectionCRUD.UserCollection_Add(userCollection)) {
								return new Transformations_JSON().String_Transformations_JSON("[{"+"State"+":"+"true"+"}]");
							} else {
								// 添加收藏 失败
								return new Transformations_JSON()
										.String_Transformations_JSON("[{"+"Error"+":"+"Add the collection failure"+"}]");
							}
						}
					}
				} else {
					// Token 校验不通过
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
				}
			} else {
				// 用户未登陆
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"The user has not landed"+"}]");
			}

		} else {
			// 链接是非法的
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
}
