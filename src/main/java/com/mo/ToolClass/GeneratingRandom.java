package com.mo.ToolClass;
import java.util.Random;

/**
 * @program:
 * @description: 生成 随机数
 * @author: Dai Yuanchuan
 * @create: 2018-09-04 12:21
 **/
public class GeneratingRandom {


    /**
     * 得到from到to的随机数，包括to
     *
     * @param from
     * @param to
     * @return
     */
    public static int getRandomNumber(int from, int to) {
        float a = from + (to - from) * (new Random().nextFloat());
        int b = (int) a;
        return ((a - b) > 0.5 ? 1 : 0) + b;
    }

    public static String getNonceString(int len) {
        String seed = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuffer tmp = new StringBuffer();
        for (int i = 0; i < len; i++) {
            tmp.append(seed.charAt(getRandomNumber(0, 61)));
        }
        return tmp.toString();
    }

    /**
     * 产生字母和数字的随机组合
     *
     * @param n : 需要的长度
     * @return
     */
    public static String getItemID(int n) {
        String val = "";
        Random random = new Random();
        for (int i = 0; i < n; i++) {
            String str = random.nextInt(2) % 2 == 0 ? "num" : "char";
            // 产生字母
            if ("char".equalsIgnoreCase(str)) {
                int nextInt = random.nextInt(2) % 2 == 0 ? 65 : 97;
                val += (char) (nextInt + random.nextInt(26));
                // 产生数字
            } else if ("num".equalsIgnoreCase(str)) {
                val += String.valueOf(random.nextInt(10));
            }
        }
        return val;
    }

}
