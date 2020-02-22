package com.mo.music.dao.mapper;

import com.mo.music.entity.UserCollection;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface UserCollectionCRUD {

    /**
     * 添加用户收藏
     */
     boolean UserCollection_Add(UserCollection user_Collection);

    /**
     * 删除用户收藏
     * @param Collection_ID
     * @return
     */
     boolean Delete_UserCollection(BigDecimal Collection_ID);

    /**
     * 一键删除收藏
     * @param User_ID
     * @return
     */
     boolean BatchDelete_UserCollection(String User_ID);

    /**
     * 批量删除收藏 根据收藏ID
     * @param list
     * @return
     */
     boolean batchDeletion(List<UserCollection> list);

    /**
     * 我的收藏查询
     * @param User_ID
     * @return
     */
     List<UserCollection> My_CollectionInquire(String User_ID);


}
