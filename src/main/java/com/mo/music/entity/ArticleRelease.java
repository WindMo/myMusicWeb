package com.mo.music.entity;

import java.math.BigDecimal;

/**
 * 文章发布系统
 * 
 * @author Administrator
 *
 */
public class ArticleRelease {
	private BigDecimal Article_ID;// 表主键ID
	private String Fixed_link;// 固定连接
	private String Article_Status;// 文章发布状态
	private String Degree_Openness;// 公开度
	private String Release_Time;// 发布时间
	private String Article_Content;// 内容
	private String Label;// 标题
	private String Position;// 菜单部位

	public ArticleRelease() {
		super();
	}

	public ArticleRelease(BigDecimal article_ID, String fixed_link, String article_Status, String degree_Openness,
						  String release_Time, String article_Content, String label, String position) {
		super();
		Article_ID = article_ID;
		Fixed_link = fixed_link;
		Article_Status = article_Status;
		Degree_Openness = degree_Openness;
		Release_Time = release_Time;
		Article_Content = article_Content;
		Label = label;
		Position = position;
	}

	/**
	 * 表主键ID
	 * 
	 * @return
	 */
	public BigDecimal getArticle_ID() {
		return Article_ID;
	}

	/**
	 * 表主键ID
	 * 
	 * @param article_ID
	 */
	public void setArticle_ID(BigDecimal article_ID) {
		Article_ID = article_ID;
	}

	/**
	 * 固定连接
	 * 
	 * @return
	 */
	public String getFixed_link() {
		return Fixed_link;
	}

	/**
	 * 固定连接
	 * 
	 * @param fixed_link
	 */
	public void setFixed_link(String fixed_link) {
		Fixed_link = fixed_link;
	}

	/**
	 * 文章发布状态
	 * 
	 * @return
	 */
	public String getArticle_Status() {
		return Article_Status;
	}

	/**
	 * 文章发布状态
	 * 
	 * @param article_Status
	 */
	public void setArticle_Status(String article_Status) {
		Article_Status = article_Status;
	}

	/**
	 * 公开度
	 * 
	 * @return
	 */
	public String getDegree_Openness() {
		return Degree_Openness;
	}

	/**
	 * 公开度
	 * 
	 * @param degree_Openness
	 */
	public void setDegree_Openness(String degree_Openness) {
		Degree_Openness = degree_Openness;
	}

	/**
	 * 发布时间
	 * 
	 * @return
	 */
	public String getRelease_Time() {
		return Release_Time;
	}

	/**
	 * 发布时间
	 * 
	 * @param release_Time
	 */
	public void setRelease_Time(String release_Time) {
		Release_Time = release_Time;
	}

	/**
	 * 文章内容
	 * @return
	 */
	public String getArticle_Content() {
		return Article_Content;
	}

	/**
	 * 文章内容
	 * @param article_Content
	 */
	public void setArticle_Content(String article_Content) {
		Article_Content = article_Content;
	}

	/**
	 * 标签
	 * 
	 * @return
	 */
	public String getLabel() {
		return Label;
	}

	/**
	 * 标签
	 * 
	 * @param label
	 */
	public void setLabel(String label) {
		Label = label;
	}
	/**
	 * 菜单放置的部位
	 * @return
	 */
	public String getPosition() {
		return Position;
	}
	/**
	 * 菜单放置的部位
	 * @param position
	 */
	public void setPosition(String position) {
		Position = position;
	}
	
}
