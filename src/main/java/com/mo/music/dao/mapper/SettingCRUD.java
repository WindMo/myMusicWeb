package com.mo.music.dao.mapper;

import com.mo.music.entity.Setting;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface SettingCRUD {

    /**
     * 查询是否允许  登陆后试听
     * @return
     */
     List<Setting> IsLandingAuditions();

    /**
     * 修改设置
     * @param string
     * @return
     */
     boolean Modify_settings(String string);
}
