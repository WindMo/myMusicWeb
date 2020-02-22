package com.mo.ToolClass;

import java.util.List;

import net.sf.json.JSONArray;

/**
 * list转成JSON 工具类
 * 
 * @author Administrator
 *
 */
public class Transformations_JSON {

	/**
	 * 把list数据转成JSON
	 * 
	 * @param list
	 * @return
	 */
	public JSONArray List_Transformations_JSON(List<?> list) {
		JSONArray json = JSONArray.fromObject(list);
		return json;
	}

	/**
	 * 把String数据转成JSON
	 * 
	 * @param str
	 * @return
	 */
	public JSONArray String_Transformations_JSON(String str) {
		JSONArray json = JSONArray.fromObject(str);
		return json;
	}
}
