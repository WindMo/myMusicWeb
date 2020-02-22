package com.mo.ToolClass;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.base.Preconditions;

/**
 * @program: PartyAffairs
 * @description: ZIP工具包
 * @author: Dai Yuanchuan
 * @create: 2019-02-19 13:44
 **/
public class ZipUtils {

    private ZipUtils() {
    }
    
    /**
     * 设置response头 为下载zip, 设置文件名. 应该在response写出之前被调用
     */
    public static void configDownloadZip(HttpServletResponse response, String fileName) {
        Preconditions.checkState(!response.isCommitted(), "config download excel should be called before response is committed");
        response.setHeader("Content-Type", "application/zip");
        response.setContentType("application/x-msdownload;charset=utf-8");
        try {
            fileName = URLEncoder.encode(fileName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
    }

    /**
     * 生成压缩包
     * @param request
     * @return
     */
    public static void generateZip(HttpServletRequest request,
                                     HttpServletResponse response,String[] fileList){
 
        ZipOutputStream zos = null;
        try {
 
            //关联response输出流，直接将zip包文件内容写入到response输出流并下载
//            zos = new ZipOutputStream(response.getOutputStream());
        	zos = new ZipOutputStream(new FileOutputStream("C:\\Users\\Administrator\\Desktop\\zzz.zip"));
 
            //循环读取文件路径集合，获取每一个文件的路径
            for(String fp : fileList){
                File f = new File(fp);  //根据文件路径创建文件
                zipFile(f, zos);  //将每一个文件写入zip文件包内，即进行打包
                //刷新缓冲区
                response.flushBuffer();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try{
                if(zos != null){
                    zos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * 封装压缩文件的方法
     * @param inputFile
     * @param zipoutputStream
     */
    public static void zipFile(File inputFile,ZipOutputStream zipoutputStream) {
        try {
            if(inputFile.exists()) { //判断文件是否存在
                if (inputFile.isFile()) {  //判断是否属于文件，还是文件夹
 
                    //创建输入流读取文件
                    FileInputStream fis = new FileInputStream(inputFile);
                    BufferedInputStream bis = new BufferedInputStream(fis);
 
                    //将文件写入zip内，即将文件进行打包
                    ZipEntry ze = new ZipEntry(inputFile.getName()); //获取文件名
                    zipoutputStream.putNextEntry(ze);
 
                    //写入文件的方法，同上
                    byte [] b=new byte[1024];
                    long l=0;
                    while(l<inputFile.length()){
                        int j=bis.read(b,0,1024);
                        l+=j;
                        zipoutputStream.write(b,0,j);
                    }
                    //关闭输入输出流
                    fis.close();
                    bis.close();
                } else {  //如果是文件夹，则使用穷举的方法获取文件，写入zip
                    try {
                        File[] files = inputFile.listFiles();
                        for (int i = 0; i < files.length; i++) {
                            zipFile(files[i], zipoutputStream);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

