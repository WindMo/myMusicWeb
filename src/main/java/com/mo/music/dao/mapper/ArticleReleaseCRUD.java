package com.mo.music.dao.mapper;

import com.mo.music.entity.ArticleRelease;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */
@Mapper
public interface ArticleReleaseCRUD {

    /**
     * 添加文章数据
     * @param Article_Release
     * @return
     */
    boolean addArticleRelease(ArticleRelease Article_Release);

    boolean articleInfoDelete(BigDecimal Article_ID);

    /**
     * 查询所有的文章
     * @return
     */
    List<ArticleRelease> articleInfoInquire();

    /**
     * 根据文章ID查找  相应的内容
     * @param Article_ID
     * @return
     */
    List<ArticleRelease> accordingToArticleID(String Article_ID);

    /**
     * 根据文章标题
     */
    List<ArticleRelease> accordingToArticleName(String Article_Name);

    /**
     * 根据给出关键词查找文章
     * @param keyword
     * @return
     */
    List<ArticleRelease> accordingToKeyWord(String keyword);

    /**
     * 修改文章
     * @param Article_Release
     * @return
     */
    boolean modifyArticle(ArticleRelease Article_Release);
}
