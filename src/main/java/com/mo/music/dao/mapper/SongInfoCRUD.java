package com.mo.music.dao.mapper;

import com.mo.music.entity.HistoricalDownload;
import com.mo.music.entity.SongInfo;
import org.apache.ibatis.annotations.Mapper;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface SongInfoCRUD {

    /**
     * 歌曲添加
     * @param song_Info
     * @return
     */
     boolean Add_Song(List<SongInfo> song_Info);

    /**
     * 删除  歌曲信息
     * @param Song_ID
     * @return
     */
     boolean Delete_Song(String Song_ID);

    /**
     * 查询歌曲的总数
     *
     * @return
     */
     BigDecimal Songs_TotalNumberInquire();

    /**
     * 根据试听地址查询song_ID
     *
     * @param address
     * @return
     */
     BigDecimal According_toAuditionAddress_Inquire(String address);

    /**
     * 根据传入的limit分页数据查询
     *
     * @param limit
     * @return
     */
     List<SongInfo> According_tolimit_Inquire(String limit);
    /**
     * 根据歌曲ID查询歌曲信息
     *
     * @param Song_ID
     * @return
     */
     List<SongInfo> According_toSongID_Inquire(String Song_ID);

    /**
     * 查找多个歌曲信息
     * @param song
     * @return
     */
     List<SongInfo> findMultiple(List<Integer> song);

    /**
     * 定义搜索 根据给定Key搜索
     *
     * @param Key
     * @return
     */
     List<SongInfo> According_toKey_Search(String Key, String limit);

    /**
     * 查看搜索结果总数
     *
     * @param Key
     * @return
     */
     BigDecimal The_number_of_search_results(String Key);

    /**
     * 查出分类条件的总数
     *
     * @param classification_conditions
     * @return
     */
     BigDecimal Classification_conditions_Total_Number(String classification_conditions);;

    /**
     * 分类条件查询
     *
     * @return
     */
     List<SongInfo> Conditional_query(String Condition);

    /**
     * 查询下载信息
     * @param downloads
     * @return
     */
     List<SongInfo> queryDownloadInfo(List<HistoricalDownload> downloads);

    /**
     * 查询排行榜前 100 名
     *
     * @return
     */
     List<SongInfo> getTop();

     /**--------------------------------------------update--------------------------------------------**/

    /**
     * 修改歌曲信息
     * @param song_Info
     * @return
     */
     boolean Modify_SongInfo(SongInfo song_Info);

    /**
     * 修改下载量
     * @param song_Info
     * @return
     */
     boolean downloadRank(List<SongInfo> song_Info);

    /**
     * 修改上传下载文件
     * @param song_Info
     * @return
     */
     boolean Modify_Downloader(SongInfo song_Info);


}
