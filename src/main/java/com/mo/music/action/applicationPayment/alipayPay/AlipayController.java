package com.mo.music.action.applicationPayment.alipayPay;

import com.alipay.api.AlipayApiException;
import com.alipay.api.internal.util.AlipaySignature;
import com.mo.music.dao.mapper.MembershipOrderCRUD;
import com.mo.music.entity.MembershipOrder;
import com.mo.music.action.MemberAction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by Danny on 2017/12/26.
 */
@Controller()
@RequestMapping("alipay")
public class AlipayController {
	@Resource
	private IAlipayService iAlipayService;
	@Autowired
	MembershipOrderCRUD orderCRUD;

	/**
	 * 支付
	 * 
	 * @param orderId
	 *            订单编号
	 * @param amount
	 *            金额
	 * @param orderName
	 *            订单名称
	 * @param description
	 *            描述
	 * @param returnUrl
	 *            返回URL PriceID 资费ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping("pay")
	public String pay(String orderId, String amount, String orderName, String description, String returnUrl,
			String user_id, String PriceID,HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		return iAlipayService.pay(orderId, amount, orderName, description, returnUrl, user_id, PriceID, request, response);
	}

	/**
	 * 
	 * 查询
	 * 
	 * @param orderId
	 *            订单编号
	 * @return
	 */
	@ResponseBody
	@RequestMapping("query")
	public String query(String orderId, String alipayOrderId,HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		return iAlipayService.query(orderId, alipayOrderId, request, response);
	}

	/**
	 * 退款
	 * 
	 * @param orderId
	 *            订单编
	 * @param amount
	 *            金额
	 * @param reason
	 * @param refundReqNum
	 * @return
	 */
	@ResponseBody
	@RequestMapping("refund")
	public String refund(String orderId, String alipayOrderId, String amount, String reason, String refundReqNum,HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		return iAlipayService.refund(orderId, alipayOrderId, amount, reason, refundReqNum, request, response);
	}

	/**
	 * 退款查询
	 * 
	 * @param orderId
	 *            订单编号
	 * @return
	 */
	@ResponseBody
	@RequestMapping("refundQuery")
	public String refundQuery(String orderId, String alipayOrderId, String refundReqNum,HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		return iAlipayService.refundQuery(orderId, alipayOrderId, refundReqNum, request, response);
	}

	@ResponseBody
	@RequestMapping("close")
	public String close(String orderId, String alipayOrderId) {
		return iAlipayService.close(orderId, alipayOrderId, null, null);
	}

	@RequestMapping("returnUrl")
	public String returnUlr(HttpServletRequest request, HttpServletResponse response)
			throws UnsupportedEncodingException, AlipayApiException {
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		Map<String, String> params = new HashMap<String, String>();
		@SuppressWarnings("unchecked")
		Map<String, String[]> requestParams = request.getParameterMap();
		for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用
			valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}

		boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset,
				AlipayConfig.sign_type); // 调用SDK验证签名

		// ——请在这里编写您的程序（以下代码仅作参考）——
		if (signVerified) {
			// 商户订单号
			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 支付宝交易号
			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");

			// 付款金额
			String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"), "UTF-8");

		} else {
			System.out.println("----------------------支付失败--------------------------");
			AlipayConfig.logResult(
					"----------------------returnUlr支付失败--------------------------\nsignVerified=" + signVerified);
		}
		return "/indexs";
	}

	@RequestMapping(value = "notify_url", method = RequestMethod.POST)
	public String notify_url(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
		System.out.println("====================================== > 进入 notify_url");
		// 获取支付宝POST过来反馈信息
		Map<String, String> params = new HashMap<String, String>();
		Map<String, String[]> requestParams = request.getParameterMap();
		for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
			}
			// 乱码解决，这段代码在出现乱码时使用
			// valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}
		try {
			boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset,
					AlipayConfig.sign_type); // 调用SDK验证签名
			/*
			 * 实际验证过程建议商户务必添加以下校验： 1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
			 * 2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
			 * 3、校验通知中的seller_id（或者seller_email)
			 * 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
			 * 4、验证app_id是否为该商户本身。
			 */
			if (signVerified) {// 验证成功

				// Request.Form

				// 商户订单号
				String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");

				// 支付金额
				String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"), "UTF-8");

				// 支付宝交易号
				String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");

				// 交易状态
				String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8");
				
				System.out.println("============================================= > 数据获取成功   trade_status = "+trade_status);

				if (trade_status.equals("TRADE_FINISHED")) {
					// 判断该笔订单是否在商户网站中已经做过处理
					// 如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
					// 如果有做过处理，不执行商户的业务程序

					// 注意：
					// 退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
				} else if (trade_status.equals("TRADE_SUCCESS")) {
					// 判断该笔订单是否在商户网站中已经做过处理
					// 如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
					// 如果有做过处理，不执行商户的业务程序

					// 注意：
					// 付款完成后，支付宝系统发送该交易状态通知
					
					// 添加会员信息
					if(new MemberAction().Add_Membership_Information(out_trade_no)){
						// 修改订单信息
						MembershipOrder MembershipOrder = new MembershipOrder();
						MembershipOrder.setAlipay_Order_Id(trade_no);
						MembershipOrder.setOrder_Status("已支付");
						MembershipOrder.setOrder_Number(out_trade_no);
						MembershipOrder.setActual_payment(total_amount);
						// 修改订单信息
						orderCRUD.modifyOrderInfo(MembershipOrder);
					}
					return "success";
				} else {
					AlipayConfig.logResult(
							"----------------------notify_url支付失败--------------------------\ntrade_status" + trade_status);
				}

			} else {
				// 验证失败
				System.out.println("============================== > 验证失败 signVerified = " + signVerified);
				// 调试用，写文本函数记录程序运行情况是否正常
				String sWord = AlipaySignature.getSignCheckContentV1(params);
				AlipayConfig.logResult(sWord);
			}			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		// ——请在这里编写您的程序（以上代码仅作参考）——
		return "success";
	}
}
