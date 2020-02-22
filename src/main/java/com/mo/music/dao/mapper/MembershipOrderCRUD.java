package com.mo.music.dao.mapper;

import com.mo.music.entity.MembershipOrder;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface MembershipOrderCRUD {

    boolean addOrder(List<MembershipOrder> Order);

    boolean memberInfoDelete(String Order_ID);

    /**
     * 根据商户订单编号查询用户信息
     * @param OrderNumber
     * @return
     */
    List<MembershipOrder> accordingToOrderNumberInquire(String OrderNumber);

    /**
     * 显示所有的 会员订单Info
     * @return
     */
    List<MembershipOrder> viewAllMembershipOrderInfo(String Page);

    BigDecimal orderNumber(String page);


    /**
     * 修改订单信息
     * @param MembershipOrder
     * @return
     */
    boolean modifyOrderInfo(MembershipOrder MembershipOrder);
}
