package com.mo.ToolClass;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

public class ImageUtil {

    //base64字符串转化成图片
    public static  boolean GenerateImage(String imgStr,String Route)
    {   //对字节数组字符串进行Base64解码并生成图片
        if (imgStr == null) //图像数据为空
            return false;
        sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
        try
        {
            //Base64解码
            byte[] b = decoder.decodeBuffer(imgStr);
            for(int i=0;i<b.length;++i)
            {
                if(b[i]<0)
                {//调整异常数据
                    b[i]+=256;
                }
            }
            //生成jpeg图片
            java.io.OutputStream out = new java.io.FileOutputStream(Route);
            out.write(b);
            out.flush();
            out.close();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}
