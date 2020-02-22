package com.mo.ToolClass;

import org.springframework.web.util.HtmlUtils;

/**
 * HTML 各类方法
 * @author Administrator
 *
 */
public class HtmlUtil {
	
    /** 
     * 把html的标签转换成特殊字符 
     */  
	public String htmlEscape(String html) {
		return HtmlUtils.htmlEscape(html);
		// 输出：&lt;p&gt;Hello&lt;/p&gt;
	}

	/**
	 * 把html的标签转换成普通数字
	 */
	public String htmlEscapeDecimal(String html) {
		return HtmlUtils.htmlEscapeDecimal(html);
		// 输出：&#60;p&#62;Hello&#60;/p&#62;
	}

	/**
	 * 把html的标签转换成符合Intel HEX文件的字符串
	 */
	public String htmlEscapeHex(String html) {
		return HtmlUtils.htmlEscapeHex(html);
		// 输出：<&#x3c;p&#x3e;Hello&#x3c;/p&#x3e;
	}

	/**
	 * 把html的特殊字符反转换成html标签 以上三种方法都可以反转换
	 */
	public String htmlUnescape(String html) {
		return HtmlUtils.htmlUnescape(html);
		// 输出：<p>Hello</p>
	}
}
