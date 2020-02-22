package com.mo.music.action.applicationPayment.alipayPay;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by Danny on 2017/12/26.
 */
public interface IAlipayService {
    String pay(String orderId, String amount, String orderName, String description, String returnUrl, String User_ID, String PriceID, HttpServletRequest request, HttpServletResponse response);

    String query(String orderId, String alipayOrderId, HttpServletRequest request, HttpServletResponse response);

    String refund(String orderId, String alipayOrderId, String amount, String reason, String refundReqNum, HttpServletRequest request, HttpServletResponse response);

    String refundQuery(String orderId, String alipayOrderId, String refundReqNum, HttpServletRequest request, HttpServletResponse response);

    String close(String orderId, String alipayOrderId, HttpServletRequest request, HttpServletResponse response);
}
