package com.mo.music;

import com.mo.ToolClass.GetTodayTime;
import com.mo.music.dao.mapper.DownloadInfoCRUD;
import com.mo.music.dao.mapper.MemberInfoCRUD;
import com.mo.music.dao.mapper.MembershipPriceCRUD;
import com.mo.music.dao.mapper.SongInfoCRUD;
import com.mo.music.entity.DownloadInfo;
import com.mo.music.entity.MemberInfo;
import com.mo.music.entity.MembershipPrice;
import com.mo.music.entity.SongInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/22.
 */

@Component
public class DowloadUtil {

    @Autowired
    DownloadInfoCRUD downloadInfoCRUD;
    @Autowired
    SongInfoCRUD songInfoCRUD;
    @Autowired
    MembershipPriceCRUD priceCRUD;
    @Autowired
    MemberInfoCRUD memberInfoCRUD;


    /**
     * 查看用户是否具有下载的权限
     * @param Song_ID
     * @param User_ID
     * @return
     */
    public boolean isDownloadPermissions(String Song_ID,String User_ID,String MemberInfo){

        List<SongInfo> infos = songInfoCRUD.According_toSongID_Inquire(Song_ID);
        if(infos.isEmpty()){
            return false;
        }else{
            for(SongInfo song_Info : infos){
                // 获取  用户  对应的配置文件
                List<DownloadInfo> download_Infos = downloadInfoCRUD.numberOfDownloads(User_ID);
                BigDecimal Genre = downloadInfoCRUD.firstMessage(song_Info.getSong_Genre());
                // 配置 信息 不存在  || 曲风不存在
                if(MemberInfo.contains("包年")){
                    MemberInfo = "包年";
                }else if(MemberInfo.contains("包月")){
                    MemberInfo = "包月";
                }else if(MemberInfo.contains("包季")){
                    MemberInfo = "包季";
                }
                List<MembershipPrice> list = priceCRUD.CustomQuery("LOCATE('"+MemberInfo+"', `Membership_Name`)>0");
                if(download_Infos.isEmpty()||Genre==null){
                    // 不存在   添加一条信息
                    DownloadInfo download_Info = new DownloadInfo();
                    if(list.isEmpty()){
                        return false;
                    }else{
                        for(MembershipPrice membership_Price : list){
                            download_Info.setAll_DownloadNum(membership_Price.getPrice_ID());
                            // 风格名称
                            download_Info.setGenre_Name(song_Info.getSong_Genre());
                            if(download_Info.getSurplus_Number()==null||download_Info.getSurplus_Number().compareTo(null)==0){
                                download_Info.setSurplus_Number(new BigDecimal("0"));
                            }
                            if(download_Info.getSurplus_Number().add(new BigDecimal("1")).compareTo(membership_Price.getDownloads())<=0){
                                // 已经下载量 +1
                                download_Info.setSurplus_Number(new BigDecimal("1"));
                                // 用户ID
                                download_Info.setUser_ID(new BigDecimal(User_ID));
                                return downloadInfoCRUD.addDownloadInfo(download_Info);
                            }
                        }
                    }
                }else{
                    boolean type = false;
                    // 存在  直接查找
                    for(DownloadInfo download_Info : download_Infos){
                        if(download_Info.getGenre_Name()==null){
                            download_Info.setGenre_Name("");
                        }
                        // 选出 对应的 曲风
                        if(download_Info.getGenre_Name().equals(song_Info.getSong_Genre())){
                            type = true;
                            for(MembershipPrice membership_Price : list){
                                download_Info.setAll_DownloadNum(membership_Price.getPrice_ID());
                                // 判断  用户  是否存在对该 曲风 下载的 权限
                                if(membership_Price.getDownloads().compareTo(download_Info.getSurplus_Number())>=0){
                                    // 修改用户  剩余下载数量
                                    if(download_Info.getSurplus_Number().add(new BigDecimal("1")).compareTo(membership_Price.getDownloads())<=0){
                                        download_Info.setSurplus_Number(download_Info.getSurplus_Number().add(new BigDecimal("1")));
                                        // 调用修改 链接   返回结果
                                        return downloadInfoCRUD.modifyDownloadInfotoID(download_Info);
                                    }
                                }
                            }
                        }
                    }
                    // 没有 找到  对应的曲风
                    if(type==false){
                        // 不存在   添加一条信息
                        DownloadInfo info = new DownloadInfo();
                        for(MembershipPrice membership_Price : list){
                            info.setAll_DownloadNum(membership_Price.getPrice_ID());
                        }
                        // 风格名称
                        info.setGenre_Name(song_Info.getSong_Genre());
                        // 已经下载量 +1
                        info.setSurplus_Number(new BigDecimal("1"));
                        // 用户ID
                        info.setUser_ID(new BigDecimal(User_ID));
                        return downloadInfoCRUD.addDownloadInfo(info);
                    }else{
                        return false;
                    }
                }
            }
            return false;
        }
    }

    /**
     * 判断用户是否是会员
     * @param User_ID
     * @return
     */
    public String isMember(String User_ID){

        if(User_ID!=null&&User_ID!=""){
            // 查询用户是否是会员
            for(MemberInfo member_Info : memberInfoCRUD.accordingToUserIDInquire(new BigDecimal(User_ID))){
                // 查找用户会员是否到期
                // 当前时间   减   会员结束时间   return false  代表会员已经到期
                if (new GetTodayTime().TwoDateIntervalDays(
                        new GetTodayTime().GetNetworkTodayTime("yyyy-MM-dd HH:mm:ss"), member_Info.getExpiry_Time(),
                        "yyyy-MM-dd HH:mm:ss") < 0) {
                    return member_Info.getMember_Type();
                }else{
                    memberInfoCRUD.memberInfoDelete(member_Info.getMember_ID(),String.valueOf(member_Info.getUser_ID()));
                    return "false";
                }
            }
            return "false";
        }else{
            return "false";
        }
    }
}
