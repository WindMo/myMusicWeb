package com.mo.music.entity;

/**
 * @program:
 * @description:状态返回类
 * @author: Dai Yuanchuan
 * @create: 2019-01-03 09:58
 **/
public class Result {
	
    public static final String SUCCESS = "0";
    public static final String FAIL = "1";
    
    private String code;
    private String message;
    private Object data;
    
    private Result(String code, String message) {
        this.code = code;
        this.message = message;
    }

    private Result(String code, String message, Object obj) {
        this.code = code;
        this.message = message;
        this.data = obj;
    }
    
    public static Result ok(Object data) {
        return new Result(SUCCESS, "请求成功", data);
    }

    public static Result ok() {
        return new Result(SUCCESS, "请求成功", "success");
    }

    public static Result ok(String code, String message) {
        return new Result(code, message);
    }

    public static Result ok(String code, String message, Object data) {
        return new Result(code, message, data);
    }

    public static Result fail(Object data) {
        return new Result(FAIL, "请求失败", data);
    }

    public static Result fail(String message) {
        return new Result(FAIL, message, "");
    }

    public static Result fail(String code, String message) {
        return new Result(code, message);
    }

    public static Result fail(String code, String message, Object data) {
        return new Result(code, message, data);
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
