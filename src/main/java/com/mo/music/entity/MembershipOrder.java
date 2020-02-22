package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 订单表
 * @author Administrator
 *
 */
public class MembershipOrder {
	
	private BigDecimal Order_ID;//订单ID
	private String Order_Number;//商户订单编号
	private int Quantity_of_goods;//货物数量
	private String Order_Name;//订单名称
	private String Commodity_Description;//商品详情
	private String Alipay_Order_Id;//支付宝订单ID
	private int Order_Amount;//订单金额
	private String Order_Status;//订单状态
	private BigDecimal User_ID;//用户ID
	private BigDecimal PriceID;//资费ID
	private String Actual_payment;// 实际支付金额
	

	public MembershipOrder(BigDecimal order_ID, String order_Number, int quantity_of_goods, String order_Name,
						   String commodity_Description, String alipay_Order_Id, int order_Amount, String order_Status,
						   BigDecimal user_ID, BigDecimal priceID, String actual_payment) {
		super();
		Order_ID = order_ID;
		Order_Number = order_Number;
		Quantity_of_goods = quantity_of_goods;
		Order_Name = order_Name;
		Commodity_Description = commodity_Description;
		Alipay_Order_Id = alipay_Order_Id;
		Order_Amount = order_Amount;
		Order_Status = order_Status;
		User_ID = user_ID;
		PriceID = priceID;
		Actual_payment = actual_payment;
	}
	public MembershipOrder() {
		super();
	}

	public BigDecimal getOrder_ID() {
		return Order_ID;
	}
	public void setOrder_ID(BigDecimal order_ID) {
		Order_ID = order_ID;
	}
	public String getOrder_Number() {
		return Order_Number;
	}
	public void setOrder_Number(String order_Number) {
		Order_Number = order_Number;
	}
	public int getQuantity_of_goods() {
		return Quantity_of_goods;
	}
	public void setQuantity_of_goods(int quantity_of_goods) {
		Quantity_of_goods = quantity_of_goods;
	}
	public String getOrder_Name() {
		return Order_Name;
	}
	public void setOrder_Name(String order_Name) {
		Order_Name = order_Name;
	}
	public String getCommodity_Description() {
		return Commodity_Description;
	}
	public void setCommodity_Description(String commodity_Description) {
		Commodity_Description = commodity_Description;
	}
	public String getAlipay_Order_Id() {
		return Alipay_Order_Id;
	}
	public void setAlipay_Order_Id(String alipay_Order_Id) {
		Alipay_Order_Id = alipay_Order_Id;
	}
	public int getOrder_Amount() {
		return Order_Amount;
	}
	public void setOrder_Amount(int order_Amount) {
		Order_Amount = order_Amount;
	}
	public String getOrder_Status() {
		return Order_Status;
	}
	public void setOrder_Status(String order_Status) {
		Order_Status = order_Status;
	}
	public BigDecimal getUser_ID() {
		return User_ID;
	}
	public void setUser_ID(BigDecimal user_ID) {
		User_ID = user_ID;
	}
	public BigDecimal getPriceID() {
		return PriceID;
	}
	public void setPriceID(BigDecimal priceID) {
		PriceID = priceID;
	}

	public String getActual_payment() {
		return Actual_payment;
	}

	public void setActual_payment(String actual_payment) {
		Actual_payment = actual_payment;
	}
	
}
