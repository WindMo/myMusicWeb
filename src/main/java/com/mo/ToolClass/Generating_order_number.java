package com.mo.ToolClass;

import java.util.Date;

/**
 * 生成订单号
 * @author Administrator
 *
 */
public class Generating_order_number {
	
	/**
	 * 传入  流水号(如果有)
	 * @param FlowNumber
	 * @return
	 */
	public String Order_Number(String FlowNumber){
		return String.valueOf(new Date().getTime())+getItemID(3)+FlowNumber+getItemID(3);
	}
	
	/**
	 * 产生字母和数字的随机组合
	 * @param n : 需要的长度
	 * @return
	 */
	public String getItemID(int n) {
		String val = "";
		java.util.Random random = new java.util.Random();
		for (int i = 0; i < n; i++) {
			String str = random.nextInt(2) % 2 == 0 ? "num" : "char";
			if ("char".equalsIgnoreCase(str)) { // 产生字母
				int nextInt = random.nextInt(2) % 2 == 0 ? 65 : 97;
				val += (char) (nextInt + random.nextInt(26));
			} else if ("num".equalsIgnoreCase(str)) { // 产生数字
				val += String.valueOf(random.nextInt(10));
			}
		}
		return val;
	}
	
	
}
