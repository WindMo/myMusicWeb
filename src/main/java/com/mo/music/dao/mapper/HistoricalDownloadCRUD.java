package com.mo.music.dao.mapper;

import com.mo.music.entity.HistoricalDownload;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface HistoricalDownloadCRUD {

    /**
     * 添加下载信息
     * @param download_Infos
     * @return
     */
    boolean addHistoricalDownloadAdd(HistoricalDownload download_Infos);

    /**
     * 历史下载查询
     * @param User_ID
     * @return
     */
    List<HistoricalDownload> myDownloadInquire(String User_ID);

    List<HistoricalDownload> myDownloadInquire(List<HistoricalDownload> downloads);

    /**
     * 查出总数
     * @param sql
     * @return
     */
    BigDecimal toTal(String sql);
}
