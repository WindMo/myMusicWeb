package com.mo.ToolClass;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * 解析JSON格式的String字符串
 * 工具类
 * @author Administrator
 *
 */
public class JSON_Transformations_String {
	
	/**
	 * 传入  JSON格式的str字符串   key  返回JSON的值
	 * @param str
	 * @param KeyWord
	 * @return
	 */
	public String Transformations_String (String str,String KeyWord){
		JsonObject obj = new JsonParser().parse(str).getAsJsonObject();
		//判断关键词是否存在
		try {
			return obj.get(KeyWord).getAsString();
		} catch (Exception e) {
			return "Error:关键词   "+KeyWord+" 不存在";
		}
	}
}
