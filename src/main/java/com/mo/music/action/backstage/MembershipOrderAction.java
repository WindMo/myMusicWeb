package com.mo.music.action.backstage;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.ToolClass.Transformations_JSON;
import com.mo.ToolClass.Verify_HTTP;
import com.mo.music.dao.mapper.MemberInfoCRUD;
import com.mo.music.dao.mapper.MembershipOrderCRUD;
import com.mo.music.entity.MembershipOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 对后台订单的操作类
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value = "/Order_Management")
public class MembershipOrderAction {

	@Autowired
	MemberInfoCRUD memberInfoCRUD;
	@Autowired
	MembershipOrderCRUD membershipOrderCRUD;

	/**
	 * 删除一条订单信息
	 * @param Order_ID
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Delete_order_information")
	public @ResponseBody net.sf.json.JSONArray Delete_order_information(String Order_ID,String User_ID,String Token,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				return new Transformations_JSON().String_Transformations_JSON("[{\"State\":\""+membershipOrderCRUD.memberInfoDelete(Order_ID)+"\"}]");
			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
	
	/**
	 * 进入订单编辑页面
	 * @param Order_Number
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Order_EditorsPage")
	public ModelAndView Membership_EditorsPage(@RequestParam("Order_Number") String Order_Number,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		ModelAndView ModelAndView = new ModelAndView("/AdminPage/order_editors/order_editors");
		//查询订单信息
		for(MembershipOrder membership_Order : membershipOrderCRUD.accordingToOrderNumberInquire(Order_Number)){
			ModelAndView.addObject("Order_Name",membership_Order.getOrder_Name());
			ModelAndView.addObject("Commodity_Description",membership_Order.getCommodity_Description());
			ModelAndView.addObject("Order_Status",membership_Order.getOrder_Status());
			ModelAndView.addObject("Order_Number",membership_Order.getOrder_Number());
		}
		return ModelAndView;
	}
	
	/**
	 * 修改订单信息
	 * @param Order_Name
	 * @param Commodity_Description
	 * @param Order_Status
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/Modifying_orderInfo")
	public @ResponseBody net.sf.json.JSONArray Modifying_orderInfo(String Order_Name, String Commodity_Description,
			String Order_Status, String Order_Number,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");

		MembershipOrder membership_Order = new MembershipOrder();
		membership_Order.setOrder_Number(Order_Number);
		membership_Order.setOrder_Name(Order_Name);
		membership_Order.setCommodity_Description(Commodity_Description);
		membership_Order.setOrder_Status(Order_Status);

		return new Transformations_JSON().String_Transformations_JSON(
				"[{\"State\":\"" + membershipOrderCRUD.modifyOrderInfo(membership_Order) + "\"}]");
	}

	/**
	 * 定义搜索
	 * @param KeyWord
	 * @param User_ID
	 * @param Token
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/Order_Search")
	public @ResponseBody net.sf.json.JSONArray Order_Search(String KeyWord,String User_ID,String Token,HttpServletRequest request, HttpServletResponse response){
		try {
			request.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		if(new Verify_HTTP().Islegal(request)){
			if(new TokenUtil().validToken_admin(Token, User_ID)){
				return new Transformations_JSON().List_Transformations_JSON(membershipOrderCRUD.viewAllMembershipOrderInfo(" where  Order_Number = '"+KeyWord+"' or Alipay_Order_Id = '"+KeyWord+"' "));
			}else{
				// Token 校验不通过
				return new Transformations_JSON()
						.String_Transformations_JSON("[{\"Error\":\"Current Token illegality\"}]");
			}
		}else{
			return new Transformations_JSON()
					.String_Transformations_JSON("[{\"Error\":\"Current connection is unlawful\"}]");
		}
	}
}
