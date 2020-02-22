package com.mo.ToolClass;

import javax.servlet.http.HttpServletRequest;

/**
 * 验证 HTTP 链接  是否合法
 * @author Administrator
 *
 */
public class Verify_HTTP {
	
	/**&&(request.getHeader("Referer").contains("http://djokawa.com")||request.getHeader("Referer").contains("http://www.djokawa.com"))
	 * 判定 Referer 是否为空   同时包含 网址域名
	 * @param request
	 * @return
	 */
	public boolean Islegal(HttpServletRequest request){
		if(request.getHeader("Referer")!=null&&(request.getHeader("Referer").contains("http://djokawa.com")
				||request.getHeader("Referer").contains("http://www.djokawa.com")
				||request.getHeader("Referer").contains("http://localhost:8080"))){
			return true;
		}else {
			return false;
		}
	}
	
	private static String getIpAdrress(HttpServletRequest request) {
        String Xip = request.getHeader("X-Real-IP");
        String XFor = request.getHeader("X-Forwarded-For");
        System.out.println(XFor);
        if((XFor.equals("")||XFor.length()==0) && !"unKnown".equalsIgnoreCase(XFor)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = XFor.indexOf(",");
            if(index != -1){
                return XFor.substring(0,index);
            }else{
                return XFor;
            }
        }
        XFor = Xip;
        if((XFor.equals("")||XFor.length()==0) && !"unKnown".equalsIgnoreCase(XFor)){
            return XFor;
        }
        if ((XFor.equals("")||XFor.length()==0) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("Proxy-Client-IP");
        }
        if ((XFor.equals("")||XFor.length()==0) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("WL-Proxy-Client-IP");
        }
        if ((XFor.equals("")||XFor.length()==0) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("HTTP_CLIENT_IP");
        }
        if ((XFor.equals("")||XFor.length()==0) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if ((XFor.equals("")||XFor.length()==0) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getRemoteAddr();
        }
        System.out.println(XFor);
        return XFor;
    }
	
}
