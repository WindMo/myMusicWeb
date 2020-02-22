package com.mo.music.dao.mapper;

import com.mo.music.entity.DownloadInfo;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface DownloadInfoCRUD {

    boolean addDownloadInfo(DownloadInfo download_Infos);

    /**
     * 修改配置信息
     * @return
     */
    boolean modifyDownloadInfotoID(DownloadInfo DownloadInfo);

    /**
     * 修改所有的已经下载的
     * @return
     */
    boolean modifyAllAlready_downloaded();

    boolean modifyDownloadInfoToGenreName(DownloadInfo DownloadInfo);

    /**
     * 获取当前用户的下载信息
     * @return
     */
    List<DownloadInfo> numberOfDownloads(String UserID);

    /**
     * 获取第一条信息
     * @param GenreName
     * @return
     */
    BigDecimal firstMessage(String GenreName);

    /**
     * 删除方法
     * @param Genre_ID
     * @return
     */
    boolean downloadInfoDelete(BigDecimal Genre_ID);
}
