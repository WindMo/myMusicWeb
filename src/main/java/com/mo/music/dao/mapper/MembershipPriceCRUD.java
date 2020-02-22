package com.mo.music.dao.mapper;

import com.mo.music.entity.MembershipPrice;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface MembershipPriceCRUD {

    /**
     * 会员价格信息查询
     * @return
     */
     List<MembershipPrice> MembershipPriceInfo_Inquire();

    /**
     * 根据  会员价格ID 查询会员时间和价格
     * @param MembershipPrice_ID
     * @return
     */
    List<MembershipPrice> According_toMembershipPrice_ID(String MembershipPrice_ID);

    /**
     * 自定义查询
     * @param CustomParameters
     * @return
     */
     List<MembershipPrice> CustomQuery(String CustomParameters);

    /**
     * 拿到下载数量
     * @param CustomParameters
     * @return
     */
    BigDecimal DownloadNumberQuery(String CustomParameters);

    /**
     * 修改会员价格
     * @param MembershipPrice
     * @return
     */
     boolean Modify_Membership_Price(MembershipPrice MembershipPrice);
}
