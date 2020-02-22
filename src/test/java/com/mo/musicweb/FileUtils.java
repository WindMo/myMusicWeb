package com.mo.musicweb;

import java.io.*;

/**
 * @author WindShadow
 * @verion 2020/2/21.
 */

public class FileUtils{

    public static void writeByBufferedReader(String path, String content){
        try {
            File file = new File(path);
            file.delete();
            if (!file.exists()) {
                file.createNewFile();
            }

            FileWriter fw = new FileWriter(file, false);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(content);
            bw.flush();
            bw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static String readFileByEncode(String path, String chatSet)throws Exception{

        InputStream input = new FileInputStream(path);
        InputStreamReader in = new InputStreamReader(input, chatSet);
        BufferedReader reader = new BufferedReader(in);
        StringBuffer sb = new StringBuffer();
        String line = reader.readLine();
        while (line != null) {
            sb.append(line);
            sb.append("\r\n");
            line = reader.readLine();
        }
        return sb.toString();
    }
}
