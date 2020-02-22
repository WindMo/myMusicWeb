package com.mo.music.dao.mapper;

import com.mo.music.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface UserInfoCRUD {

    /**
     * 创建一个用户
     * @param user_Info
     * @return
     */
     boolean Create_Account(List<UserInfo> user_Info);

    /**
     * 删除一个用户
     * @param User_ID
     * @return
     */
     boolean Delete_User(String User_ID);

    /**
     * 用户登陆信息查询。
     * 匹配用户信息成功则返回UserInfo
     * 不成功返回错误提示
     * @return
     */
     List<UserInfo> UserloginInfo_Inquire(UserInfo UserInfo);

    /**
     * 根据用户ID查询用户Info
     * @param UserID
     * @return
     */
     List<UserInfo> According_toUserID(String UserID);

    /**
     * 用户  数量查询
     * @return
     */
     List<UserInfo> User_InfoNumberInquire();

    /**
     * 判断用户名是否存在
     * @param User_Name
     * @return
     */
     boolean UserName_IsEmpty(String User_Name);

    /**
     * 根据用户信息查询
     * @param According_toUser_Info
     * @return
     */
     List<UserInfo> According_toUser_Info(String According_toUser_Info);

    /**
     * 修改用户密码
     * @param UserInfo
     * @return
     */
     boolean Modify_Password(UserInfo UserInfo);

    /**
     * 修改用户信息
     * @param UserInfo
     * @return
     */
     boolean Modify_UserInfo(UserInfo UserInfo);

}
