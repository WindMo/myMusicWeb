package com.mo.ToolClass;

import java.io.File;
/**
 * 删除文件工具类
 * @author Administrator
 *
 */
public class DeleteFiles {
	private final org.slf4j.Logger logger =  org.slf4j.LoggerFactory.getLogger(getClass());
	// 删除文件夹
	// param folderPath 文件夹完整绝对路径

	public void delFolder(String folderPath) {
		try {
			delAllFile(folderPath); // 删除完里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			myFilePath.delete(); // 删除空文件夹
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 删除指定文件夹下所有文件
	// param path 文件夹完整绝对路径
	public boolean delAllFile(String path) {
		System.out.println("=================> 刪除文件"+path);
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (!file.isDirectory()) {
			return flag;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + File.separator + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
			if (temp.isDirectory()) {
				delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
				delFolder(path + "/" + tempList[i]);// 再删除空文件夹
				flag = true;
			}
		}
		return flag;
	}
	
	public boolean delFile(String path) {
		logger.info("=================> 刪除文件"+path);
	    boolean flag = false;
	    File file = new File(path);
	    logger.info("操作文件~~~~~~~~~~~~~~~~~~~-__-~~~~~~~~~~~~~~~~~~~：：:"+file);
	    if (!file.exists()) {
	        return flag;
	    }
	    try{
	        flag = file.delete();
	    }catch (Exception e){
	        e.printStackTrace();
	    }
	    return flag;
	}

}
