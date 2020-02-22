package com.mo.musicweb;

import java.io.File;
import java.io.IOException;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

public class TransferProject {

    public static void transferFile(String pathName,int depth)throws Exception{
        File dirFile = new File(pathName);
        if (!isValidFile(dirFile)) return;
        //获取此目录下的所有文件名与目录名
        String[] fileList = dirFile.list();
        int currentDepth = depth + 1;
        for (int i = 0; i < fileList.length; i++) {
            String string = fileList[i];
            File file = new File(dirFile.getPath(), string);
            String name = file.getName();
            //如果是一个目录，搜索深度depth++，输出目录名后，进行递归
            if (file.isDirectory()) {
                //递归
                transferFile(file.getCanonicalPath(), currentDepth);
            } else {
//                if (name.contains(".java") || name.contains(".properties") || name.contains(".xml")) {
//                    readAndWrite(file);
//                    System.out.println(name + " has converted to utf8 ");
//                }

                if (name.contains(".java") ) {
                    readAndWrite(file);
                    System.out.println(name + " has converted to utf8 ");
                }
            }
        }
    }


    private static boolean isValidFile(File dirFile)throws IOException {
        if (dirFile.exists()) {
            System.out.println("file exist");
            return true;
        }
        if (dirFile.isDirectory()) {
            if (dirFile.isFile()) {
                System.out.println(dirFile.getCanonicalFile());
            }
            return true;
        }
        return false;
    }

    private static void readAndWrite(File file)throws Exception{

        String content = FileUtils.readFileByEncode(file.getPath(), "GBK");
        FileUtils.writeByBufferedReader(file.getPath(), new String(content.getBytes("UTF-8"), "UTF-8"));
    }

    public static void main(String[] args)throws Exception{
        //程序入口，制定src的path
        String path = "G:\\JAVA\\项目\\MusicWebProject\\src";
        transferFile(path, 1);
    }
}

