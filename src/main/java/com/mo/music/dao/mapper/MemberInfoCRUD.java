package com.mo.music.dao.mapper;
import com.mo.music.entity.MemberInfo;
import org.apache.ibatis.annotations.Mapper;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface MemberInfoCRUD {

    /**
     * 添加一个会员数据
     * @param MemberInfo
     * @return
     */
    boolean addMemberInfo(MemberInfo MemberInfo);

    /**
     * 删除会员信息
     * @param member_ID
     * @param User_ID
     * @return
     */
    boolean memberInfoDelete(BigDecimal member_ID, String User_ID);

    /**
     * 根据用户ID查询会员信息
     * @param User_ID
     * @return
     */
    List<MemberInfo> accordingToUserIDInquire(BigDecimal User_ID);

    /**
     * 查询会员总数
     * @param Info
     * @return
     */
    BigDecimal memberNumberInquire(String Info);

    /**
     * 根据会员ID查询会员信息
     * @param Member_ID
     * @return
     */

    List<MemberInfo> accordingToMemberIDInquire(String Member_ID);

    /**
     * 显示所有会员信息
     * @return
     */
    List<MemberInfo> viewAllMemberInfo(String Page);


    /**
     * 修改会员信息
     * @param MemberInfo
     * @return
     */
    boolean memberInfoUpdate(MemberInfo MemberInfo);



}
