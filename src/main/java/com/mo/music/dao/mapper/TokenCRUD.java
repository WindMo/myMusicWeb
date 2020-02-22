package com.mo.music.dao.mapper;

import com.mo.music.entity.Token;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

@Mapper
public interface TokenCRUD {

    /**
     * 添加一个Token 返回Token的值
     */
     String Token_add(Token token);

    /**
     * 删除当前   Token
     * @param Token_ID
     * @return
     */
     boolean Delete_CurrentToKen(String Token_ID);

    /**
     * 查询用户当前Tonken
     * @param User_ID
     * @return
     */
     List<Token> Find_CurrentToken(String User_ID);

    /**
     * 修改当前  Token
     * @param Token
     * @return
     */
     boolean Modify_CurrentToken(Token Token);
}
