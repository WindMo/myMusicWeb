package com.mo.music.action;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.Generating_order_number;
import com.mo.ToolClass.GetTodayTime;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.music.action.applicationPayment.alipayPay.IAlipayService;
import com.mo.music.dao.mapper.*;
import com.mo.music.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 申请会员
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/OpenMember")
public class MemberAction {

	@Autowired
	MemberInfoCRUD memberInfoCRUD;
	@Autowired
	MembershipOrderCRUD orderCRUD;
	@Autowired
	DownloadInfoCRUD downloadInfoCRUD;
	@Autowired
	MembershipPriceCRUD priceCRUD;
	@Autowired
	UserInfoCRUD userInfoCRUD;

	@Resource
	private IAlipayService iAlipayService;

	/**
	 * 调用支付宝接口
	 * 
	 * @param PriceID
	 * @param User_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("unused")
	@RequestMapping(value = "/Member_payment",method = RequestMethod.POST)
	public @ResponseBody String ResultSet(@RequestParam("MembershipPriceID") String PriceID,
			@RequestParam("User_ID") String User_ID,@RequestParam("Token") String Token, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken(Token, User_ID)){
				// 生成支付的URL
				String AlipayPay_URL = "";
				// 先判断 User_ID 是否为空
				if (User_ID != null || User_ID != "") {
					// 根据传入的资费ID查询价格与时间
					List<MembershipPrice> membership_Prices = priceCRUD
							.According_toMembershipPrice_ID(PriceID);
					if (!membership_Prices.isEmpty()) {
						for (MembershipPrice MembershipPrice : membership_Prices) {
							// 调用支付宝接口
							AlipayPay_URL = iAlipayService.pay(
									new Generating_order_number()
											.Order_Number(String.valueOf(MembershipPrice.getMembership_Price())),
									String.valueOf(MembershipPrice.getMembership_Price()),
									"音乐网" + MembershipPrice.getMembership_Name() + "会员",
									"开通包" + MembershipPrice.getMembership_Name() + "会员",
									"http://djokawa.com/alipay/returnUrl", User_ID, PriceID, request, response);
						}
					} else {
						// 资费ID错误
						return "Membership price ID does not exist";
					}
					if (AlipayPay_URL.equals("Failure to add order information")) {
						// 创建订单错误
						return "Failure to add order information";
					} else {
						return AlipayPay_URL;
					}
				} else {
					// UserID不存在,返回用户未登陆
					return "The user is not logged in";
				}
			}else{
				return "Current Token illegality";
			}
		}else{
			return "Current connection is unlawful";
		}
	}

	/**
	 * 进入会员页
	 */
	@RequestMapping(value = "/GetInto_MembershipPage",method = RequestMethod.POST)
	public @ResponseBody String GetInto_MembershipPage(String User_ID, String Token, HttpServletRequest request,
			HttpServletResponse response) {
        try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken(Token, User_ID)){
				StringBuffer Membership_PriceInfo = new StringBuffer();
				Membership_PriceInfo = Membership_PriceInfo.append("<div class='wrapper' style='z-index:3'>"
						+ "<div class='container'><div class='pricing_table'>");
				// 查找数据库最新会员价格
				for (MembershipPrice MembershipPrice : priceCRUD.MembershipPriceInfo_Inquire()) {
					// 会员价格信息
					Membership_PriceInfo = Membership_PriceInfo
							.append("<div class='col-md3'><div class='pricing_main'><div class='pricing_head'><h2>"
									+ MembershipPrice.getMembership_Name() + "</h2>" + "<span class='pricing-price'>￥"
									+ MembershipPrice.getMembership_Price() + "</span><div class='ewm'><img src='/MusicStyle/images/ewm.png'></div></div>" + "<ul class='pricing-features'>"
									+ "<p>good price</p>" + "<li><i class='fa fa-calendar'></i> <span>"
									+ MembershipPrice.getMembership_Days() + " days</span></li>"
									+ "<li><i class='fa fa-tachometer'></i> <span>" + MembershipPrice.getMembership_Date()
									+ "</span></li>" + "<li></li><li></li></ul>" + "<ul class='pricing-button'>"
									+ "<li><a href='javascript:void(0)' onclick='Buy_Member("+"" + MembershipPrice.getPrice_ID()+"\")' target='_blank'>支付宝充值入口</a></li>" + "</ul></div></div>");
				}
				Membership_PriceInfo = Membership_PriceInfo
						.append("</div></div></div>");
				return String.valueOf(Membership_PriceInfo);
			}else{
				return "[{'Error':'Current Token illegality'}]";
			}
		}else{
			return "[{'error':'Current connection is unlawful'}]";
		}
	}
	
	public static void main(String[] args) {
		System.out.println(new MemberAction().Add_Membership_Information("1528852253569VN4688aE9"));
	}

	/**
	 * 添加一个会员信息
	 * 
	 * @param out_trade_no
	 * @return
	 */
	public boolean Add_Membership_Information(String out_trade_no) {
		// 获取当前时间
		String CurrentTime = new GetTodayTime().GetNetworkTodayTime("yyyy-MM-dd HH:mm:ss");
		// 获取需要开通会员的天数
		String OpenDays = null;
		// 会员说明
		String Membership_Name = null;
		// 是否成功开通了会员
		boolean Add_Membership_Type = false;
		// 查找订单表
		for (MembershipOrder MembershipOrder : orderCRUD
				.accordingToOrderNumberInquire(out_trade_no)) {
			
			System.out.println("=================== > Alipay_Order_Id="+ MembershipOrder.getAlipay_Order_Id());
			
			if(MembershipOrder.getAlipay_Order_Id().equals(null)|| MembershipOrder.getAlipay_Order_Id().equals("")){
				for (MembershipPrice price : priceCRUD
						.According_toMembershipPrice_ID(String.valueOf(MembershipOrder.getPriceID()))) {
					OpenDays = price.getMembership_Days();
					Membership_Name = price.getMembership_Name();
				}
				// 查找该用户是否是会员
				List<MemberInfo> member_Infos = memberInfoCRUD
						.accordingToUserIDInquire(MembershipOrder.getUser_ID());
				// 判断会员表中是否存在会员Info
				if (member_Infos.size() > 0) {
					for (MemberInfo MemberInfo : member_Infos) {
						// 存在会员信息则判断该会员是否到期
						// 当前时间 减 会员结束时间 return false 代表会员已经到期
						if (new GetTodayTime().TwoDateIntervalDays(CurrentTime, MemberInfo.getExpiry_Time(),
								"yyyy-MM-dd HH:mm:ss") < 0) {

							// 没有到期则在原有时间上添加新的会员天数,形成续费会员
							MemberInfo info = new MemberInfo();
							info.setMember_Type(Membership_Name + "会员生效中");
							info.setExpiry_Time(new GetTodayTime().Date_Addition(MemberInfo.getExpiry_Time(),
									Long.valueOf(OpenDays), "yyyy-MM-dd HH:mm:ss"));
							info.setMember_ID(MemberInfo.getMember_ID());
							if (memberInfoCRUD.memberInfoUpdate(info)) {
								Add_Membership_Type = true;
							} else {
								Add_Membership_Type = false;
							}

						} else {
							// 到期了就删除原有数据
							if (memberInfoCRUD.memberInfoDelete(MemberInfo.getMember_ID(),String.valueOf(MemberInfo.getUser_ID()))) {
								// 添加新的会员信息
								if (new MemberAction().Add_MemberInfo(
										MembershipOrder.getUser_ID(), CurrentTime, new GetTodayTime()
												.Date_Addition(CurrentTime, Long.valueOf(OpenDays), "yyyy-MM-dd HH:mm:ss"),
										Membership_Name)) {
									Add_Membership_Type = true;
								} else {
									Add_Membership_Type = false;
								}
							} else {
								Add_Membership_Type = false;
							}
						}
					}
				} else {
					// 不存在直接添加会员
					System.out.println("添加了一个会员信息  天数 "+Long.valueOf(OpenDays)+"天");
					// 添加会员信息
					if (new MemberAction().Add_MemberInfo(MembershipOrder.getUser_ID(), CurrentTime,
							new GetTodayTime().Date_Addition(CurrentTime, Long.valueOf(OpenDays), "yyyy-MM-dd HH:mm:ss"),
							Membership_Name)) {
						Add_Membership_Type = true;
					} else {
						Add_Membership_Type = false;
					}
				}
			}
		}
		return Add_Membership_Type;
	}
	
	/**
	 * 修改会员信息
	 * 
	 * @param MemberOpening_Time
	 * @param MemberExpiry_Time
	 * @param Member_Type
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Modifying_Member_Info")
	public @ResponseBody net.sf.json.JSONArray Modifying_Member_Info(
			String MemberOpening_Time,
			String MemberExpiry_Time,
			String Member_Type,
			String Member_ID,
			String User_ID,
			String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		if(new Verify_HTTP().Islegal(request)){
			
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				// 验证传来的时间字符串
				if (new GetTodayTime().Validation_TimeFormat(MemberOpening_Time, "yyyy-MM-dd HH:mm:ss")
						&& new GetTodayTime().Validation_TimeFormat(MemberExpiry_Time, "yyyy-MM-dd HH:mm:ss")) {
					MemberInfo info = new MemberInfo();
					info.setExpiry_Time(MemberExpiry_Time);
					info.setMember_Type(Member_Type);
					info.setOpening_Time(MemberOpening_Time);
					info.setMember_ID(new BigDecimal(Member_ID));
					return new Transformations_JSON().String_Transformations_JSON(
							"[{"+"State"+":"+"" + memberInfoCRUD.memberInfoDelete(info.getMember_ID(),info.getUser_ID().toString()) + ""+"}]");
				} else {
					return new Transformations_JSON().String_Transformations_JSON("[{"+"Error"+":"+"请输入正确的时间格式"+"}]");
				}
				
				
			}else{
				// 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Identity check does not pass"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}

	/**
	 * 删除一个会员
	 * 
	 * @param Member_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Delete_member")
	public @ResponseBody net.sf.json.JSONArray Delete_member(String Member_ID,String User_ID,String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				// 删除一个会员
				return new Transformations_JSON().String_Transformations_JSON(
						"[{"+"State"+":"+"" + memberInfoCRUD.memberInfoDelete(new BigDecimal(Member_ID),"-1") + ""+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Identity check does not pass"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	
	/**
	 *会员搜索
	 * @param Keyword
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/MemberInfo_Search")
	public @ResponseBody net.sf.json.JSONArray MemberInfo_Search(String Keyword,String User_ID,String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				List<UserInfo> user_Infos = userInfoCRUD.According_toUser_Info(" User_Name = '"+Keyword+"' or User_ID = '"+Keyword+"' ");
				if(user_Infos.isEmpty()){

					String str = "[{"+"Error"+":"+"没有对应的用户信息"+"}]";
					return new Transformations_JSON()
							.String_Transformations_JSON(str);
				}else{
					// 找出 用户ID
					BigDecimal userid=null;
					for(UserInfo user_Info : user_Infos){
						userid=user_Info.getUser_ID();
					}
					
					return new Transformations_JSON().String_Transformations_JSON("[{"+"MemberInfo"+":"
							+ new Transformations_JSON().List_Transformations_JSON(
									memberInfoCRUD.accordingToUserIDInquire(userid))
							+ ","+"UserInfo"+":" + new Transformations_JSON().List_Transformations_JSON(user_Infos)
							+ "}]");
				}
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Identity check does not pass"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 会员设置
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Download_Setting" , method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Download_Setting(String User_ID,String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 判断链接
		if(new Verify_HTTP().Islegal(request)){
			// 判断Token
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				List<MembershipPrice> list = priceCRUD.MembershipPriceInfo_Inquire();
				// 拿到会员价格信息
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"OK"+","+"priceInfo"+":"+new Transformations_JSON().List_Transformations_JSON(list)+","+"Size"+":"+list.size()+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"Identity check does not pass"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	/**
	 * 修改会员价格信息
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Modify_Membership_Price" , method = RequestMethod.POST)
	public @ResponseBody net.sf.json.JSONArray Modify_Membership_Price(String User_ID,String Token,String Price,String Num,String PriceID,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		// 判断链接
		if(new Verify_HTTP().Islegal(request)){
			// 判断Token
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				try {
					MembershipPrice membership_Price = new MembershipPrice();
					membership_Price.setDownloads(new BigDecimal(Num));
					membership_Price.setMembership_Price(Integer.valueOf(Price));
					membership_Price.setPrice_ID(new BigDecimal(PriceID));
					// 修改会员价格信息
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"errMsg"+":"+"OK"+","+"result"+":"+priceCRUD.Modify_Membership_Price(membership_Price)+"}]");
				} catch (Exception e) {
					// 修改失败
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"errMsg"+":"+"Abnormal price numerical conversion"+"}]");
				}
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"errMsg"+":"+"Identity check does not pass"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"errMsg"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	
	/**
	 * 后台添加一个会员信息
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Add_member")
	public @ResponseBody net.sf.json.JSONArray Add_member(String User_Name,String Opening_Time,String Expiry_Time,String Member_Type,String User_ID,String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				// 找出 用户ID
				for(UserInfo user_Infos : userInfoCRUD.According_toUser_Info(" User_Name = '"+User_Name+"'")){
					
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"state"+":"+""+new MemberAction().Add_MemberInfo(user_Infos.getUser_ID(), Opening_Time,
									Expiry_Time,
									Member_Type)+""+"}]");
					
					
				}
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"用户名不存在"+"}]");
			}else{
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Identity check does not pass"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	
	
	/**
	 * 用户个人会员信息查询
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/membership_information_query")
	public @ResponseBody net.sf.json.JSONArray membership_information_query(String User_ID,String Token,
			HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");

		// 校验链接
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken(Token, User_ID)){
				// 查看用户会员信息
				List<MemberInfo> member_Infos = memberInfoCRUD.accordingToUserIDInquire(new BigDecimal(User_ID));
				if(member_Infos.isEmpty()){
					// 用户 不是  会员
					return new Transformations_JSON()
							.String_Transformations_JSON("[{"+"State"+":"+"The user is not a member"+"}]");
				}else{
					List<DownloadInfo> download_Infos = downloadInfoCRUD.numberOfDownloads(User_ID);
					String All_DownloadNum = "-1";
					BigDecimal bigDecimal = priceCRUD.DownloadNumberQuery(" Price_ID = "+All_DownloadNum);
					for(DownloadInfo download_Info : download_Infos){
						All_DownloadNum = String.valueOf(download_Info.getAll_DownloadNum());
						if(bigDecimal==null){
							for(MemberInfo info : member_Infos){
								if(info.getMember_Type().contains("包年")){
									All_DownloadNum = "包年";
								}else if(info.getMember_Type().contains("包月")){
									All_DownloadNum = "包月";
								}else if(info.getMember_Type().contains("包季")){
									All_DownloadNum = "包季";
								}
							}
							for(MembershipPrice membership_Price : priceCRUD.CustomQuery("LOCATE('"+All_DownloadNum+"', `Membership_Name`)>0")){
								download_Info.setAll_DownloadNum(membership_Price.getPrice_ID());
								if(download_Info.getSurplus_Number().compareTo(membership_Price.getDownloads())==1){
									download_Info.setSurplus_Number(membership_Price.getDownloads());
								}
								All_DownloadNum = String.valueOf(membership_Price.getDownloads());
							}
							downloadInfoCRUD.modifyDownloadInfotoID(download_Info);
						}
					}
					System.out.println("====================> "+All_DownloadNum);
					return new Transformations_JSON().String_Transformations_JSON("[{"+"member_Infos"+":"
							+ new Transformations_JSON().List_Transformations_JSON(member_Infos) + ","+"DownloadsInfo"+":"
							+ new Transformations_JSON().List_Transformations_JSON(download_Infos) + ","+"All_DownloadNum"+":"+All_DownloadNum+"}]");
				}
			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{"+"Error"+":"+"Current Token illegality"+"}]");
			}
		}else{
			// 链接非法
			return new Transformations_JSON()
					.String_Transformations_JSON("[{"+"Error"+":"+"Current connection is unlawful"+"}]");
		}
	}
	

	/**
	 * 添加数据库信息
	 * 
	 * @param User_ID
	 *            用户ID
	 * @param Opening_Time
	 *            开始Time
	 * @param Expiry_Time
	 *            结束Time
	 * @param Member_Type
	 *            会员状态
	 * @return
	 */
	private boolean Add_MemberInfo(BigDecimal User_ID, String Opening_Time, String Expiry_Time, String Member_Type) {
		MemberInfo info = new MemberInfo();
		info.setUser_ID(User_ID);
		info.setOpening_Time(Opening_Time);// 会员开通时间
		// 会员结束时间
		info.setExpiry_Time(Expiry_Time);
		// 会员状态
		info.setMember_Type(Member_Type + "会员生效中");
		// 添加会员信息
		if (memberInfoCRUD.addMemberInfo(info)) {
			return true;
		} else {
			return false;
		}
	}
	
	
	
	

}
