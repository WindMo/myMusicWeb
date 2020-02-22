package com.mo.music.action;

import java.io.*;
import java.math.BigDecimal;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mo.ToolClass.DeleteFiles;
import com.mo.ToolClass.Generating_order_number;
import com.mo.ToolClass.Token.TokenUtil;
import com.mo.music.dao.mapper.UserInfoCRUD;
import com.mo.music.entity.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import net.coobird.thumbnailator.Thumbnails;

/**
 * 上传文件_Action
 * @author Administrator
 *
 */
@Controller
public class UploadFileAction {

	@Autowired
	UserInfoCRUD userInfoCRUD;

	/**
	 * 定义上传文件
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/Upload_File")
	public @ResponseBody String UploadFile(@RequestParam("Type") String Type,HttpServletRequest request, HttpServletResponse response) {
        try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		String fileName="";
		File tagetFile = null;
		System.out.println("收到文件!");
		MultipartHttpServletRequest Murequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> files = Murequest.getFileMap();// 得到文件map对象
		String upaloadUrl;
		if(Type.equals("Auditions")){
			upaloadUrl = Config.UPLOADERA;//定义上传路径  
		}else{
			upaloadUrl = Config.UPLOADERD;//定义上传路径  
		}
		File dir = new File(upaloadUrl);
		// 目录不存在则创建
		if (!dir.exists()){
			dir.setWritable(true, false);
			dir.mkdirs();
		}
		for (MultipartFile file : files.values()) {
			fileName = file.getOriginalFilename();
			tagetFile = new File(upaloadUrl + fileName);// 创建文件对象
			if (!tagetFile.exists()) {// 文件名不存在 则新建文件，并将文件复制到新建文件中
				try {
					tagetFile.setWritable(true, false);
					tagetFile.createNewFile();
				} catch (IOException e) {
					e.printStackTrace();
				}
				try {
					file.transferTo(tagetFile);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}

			}
		}

		System.out.println("接收完毕");
		if(Type.equals("Auditions")){
			return Config.UPLOADERWA+fileName;
		}else{
			return Config.UPLOADERWD+fileName;
		}
	}
	
	
	/**
	 * 上传用户头像
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/Upload_Img")
	public @ResponseBody String Upload_Img(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("Job") String Job, @RequestParam("Sex") String Sex, @RequestParam("ID") String ID,
			@RequestParam("Token") String Token) {
        try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setContentType("text/html;charset=utf-8");
		if(ID!=null&&Token!=null){
			if(new TokenUtil().validToken(Token, ID)){
				String fileName="";
				File tagetFile = null;
				System.out.println("收到文件!");
				// 创建 随机数
				String ram = new Generating_order_number().getItemID(10);
				MultipartHttpServletRequest Murequest = (MultipartHttpServletRequest) request;
				Map<String, MultipartFile> files = Murequest.getFileMap();// 得到文件map对象
				String upaloadUrl = Config.UPLOADERUSERIMG+ID+"/";//定义上传路径
				File dir = new File(upaloadUrl);
				// 删除文件
				new DeleteFiles().delAllFile(upaloadUrl);
				
				// 目录不存在则创建
				if (!dir.exists()){
					dir.setWritable(true, false);
					System.out.println("=======> 文件 "+upaloadUrl+" 创建   "+dir.mkdirs());
				}
				File nets = new File(Config.UPLOADERUSERIMG+ID+"/thumbnail/");
				if (!nets.exists()){
					nets.setWritable(true, false);
					System.out.println("=======> 文件 "+nets+" 创建   "+nets.mkdirs());
				}
				for (MultipartFile file : files.values()) {
					fileName = file.getOriginalFilename();
					tagetFile = new File(upaloadUrl +ram+ fileName);// 创建文件对象
					if (!tagetFile.exists()) {// 文件名不存在 则新建文件，并将文件复制到新建文件中
						try {
							tagetFile.setWritable(true, false);
							tagetFile.createNewFile();
						} catch (IOException e) {
							e.printStackTrace();
						}
						try {
							file.transferTo(tagetFile);
						} catch (IllegalStateException e) {
							e.printStackTrace();
						} catch (IOException e) {
							e.printStackTrace();
						}

					}
				}
				// 上传成功  保存用户信息
				UserInfo UserInfo = new UserInfo();
				UserInfo.setUser_Image(Config.UPLOADERWUSERIMG+ID+"/"+ram+fileName);
				UserInfo.setUser_Sex(Sex);
				UserInfo.setUser_Job(Job);
				UserInfo.setUser_ID(new BigDecimal(ID));
				// 制作缩略图
				try {
					//压缩至指定图片尺寸（例如：横50高50），保持图片不变形，多余部分裁剪掉(这个是引的网友的代码)  
					java.awt.image.BufferedImage image = ImageIO.read(tagetFile);  
					Thumbnails.Builder<java.awt.image.BufferedImage> builder = null;
					int imageWidth = image.getWidth();  
					int imageHeitht = image.getHeight();  
					if ((float)300 / 400 != (float)imageWidth / imageHeitht) {  
					    if (imageWidth > imageHeitht) {  
					        image = Thumbnails.of(tagetFile).height(50).asBufferedImage();  
					    } else {  
					        image = Thumbnails.of(tagetFile).width(50).asBufferedImage();  
					    }  
					    builder = Thumbnails.of(image).sourceRegion(net.coobird.thumbnailator.geometry.Positions.CENTER, 50, 50).size(50, 50);  
					} else {  
					    builder = Thumbnails.of(image).size(50,50);  
					}
					File file = new File(Config.UPLOADERUSERIMG+ID+"/thumbnail/"+ram+fileName);
					file.setWritable(true, false);
					builder.outputFormat("jpg").toFile(file);  
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				// 制作大图
				try {
					java.awt.image.BufferedImage image = ImageIO.read(tagetFile);  
					Thumbnails.Builder<java.awt.image.BufferedImage> builder = null;
					int imageWidth = image.getWidth();  
					int imageHeitht = image.getHeight();  
					if ((float)300 / 400 != (float)imageWidth / imageHeitht) {  
					    if (imageWidth > imageHeitht) {  
					        image = Thumbnails.of(tagetFile).height(500).asBufferedImage();  
					    } else {  
					        image = Thumbnails.of(tagetFile).width(500).asBufferedImage();  
					    }  
					    builder = Thumbnails.of(image).sourceRegion(net.coobird.thumbnailator.geometry.Positions.CENTER, 500, 500).size(500, 500);  
					} else {  
					    builder = Thumbnails.of(image).size(500,500);  
					}
					
					tagetFile.setWritable(true, false);
					builder.outputFormat("jpg").toFile(tagetFile);  
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if(userInfoCRUD.Modify_UserInfo(UserInfo)){
					return Config.UPLOADERWUSERIMG+ID+"/thumbnail/"+ram+fileName;
				}else{
					return "false";
				}
			}else{
				return "false";
			}
		}else{
			return "false";
		}
	}

}
