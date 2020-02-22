package com.mo.ToolClass.paging;

import com.mo.music.dao.mapper.SongInfoCRUD;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * 返回分页sql语句
 * @author Administrator
 *
 */

@Component
public class PageData implements ApplicationContextAware {

	public static ApplicationContext applicationContext;
	public static SongInfoCRUD songInfoCRUD;
	/**
	 * 返回分页limit数据
	 * @param pageBean
	 * @return
	 */
	public String PangingSQL(PageBean pageBean){
		if(pageBean != null){
			return " limit "+pageBean.getStart()+","+pageBean.getPageSize();
		}else{
			return "Error:pageBean页数无效";
		}
	}
	
	public String Panging(PageBean pageBean){
		return pageBean.getStart()+"";
	}
	
	/**
	 * 获取总的页面数量
	 * @return
	 */
	public int TotalPage(BigDecimal pageSize){
		BigDecimal TotalNumber = songInfoCRUD.Songs_TotalNumberInquire();
		BigDecimal[] BigDecimal = TotalNumber.divideAndRemainder(pageSize);
		
		if(BigDecimal.length==0){
			return TotalNumber.divide(pageSize).intValue();
		}else{
			return TotalNumber.divide(pageSize).add(new BigDecimal("1")).intValue();
		}
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		this.applicationContext = applicationContext;
		this.songInfoCRUD = applicationContext.getBean(SongInfoCRUD.class);
	}
}
