package com.mo.ToolClass;

import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;


/**
 * 甯哥敤楠岃瘉宸ュ叿绫?
 *
 * @author yanqizheng
 */
@SuppressWarnings("ALL")
public class ValidateUtil {

    private final static Pattern IS_NUMBER = Pattern.compile("[0-9]*");
    private final static Pattern EMOJI = Pattern.compile("[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]", Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE);

    /**
     * 楠岃瘉鎵嬫満鍙锋牸寮忔槸鍚︽纭?
     *
     * @param phone
     * @return
     */
    public static boolean isMobilePhone(String phone) {
        if (StringUtils.isBlank(phone)) {
            return false;
        }
        if (isChinaPhoneLegal(phone)) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean isnull(String str) {
        if (str == null) {
            return true;
        }
        if (str == "" || str.length() == 0) {
            return true;
        }
        return false;
    }

    /**
     * 澶ч檰鎵嬫満鍙风爜11浣嶆暟锛屽尮閰嶆牸寮忥細鍓嶄笁浣嶅浐瀹氭牸寮?+鍚?8浣嶄换鎰忔暟
     * 姝ゆ柟娉曚腑鍓嶄笁浣嶆牸寮忔湁锛?
     * 13+浠绘剰鏁?
     * 15+闄?4鐨勪换鎰忔暟
     * 18+浠绘剰鏁?
     * 17+浠绘剰鏁?
     * 147
     */
    public static boolean isChinaPhoneLegal(String str) throws PatternSyntaxException {
        String regExp = "^((13[0-9])|(15[^4])|(18[0-9])|(17[0-9])|(147))\\d{8}$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    public static boolean isUrl(String url) {
        String regExp = "^(http|https|ftp)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(url);
        return m.matches();
    }

    public static boolean isEmail(String email) {
        String regExp = "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(email);
        return m.matches();
    }

    /**
     * 鏄惁涓轰腑鏂囧悕
     * @param name
     * @return
     */
    public static boolean isChineseName(String name) {
        String regExp = "^[\\u4e00-\\u9fa5]+(路[\\u4e00-\\u9fa5]+)*$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(name);
        return m.matches();
    }

    /**
     * 鏄惁鍖呭惈涓枃鍚?
     * @param name
     * @return
     */
    public static boolean isContainChineseName(String name) {
        String regExp = "^[^\\u4e00-\\u9fa5]+$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(name);
        return m.matches();
    }

    /**
     * 楠岃瘉鏄惁涓烘暟瀛?(涓嶅寘鍚皬鏁?)
     * @param str
     * @return
     */
    @SuppressWarnings("AlibabaAvoidPatternCompileInMethod")
    public static boolean isNumeric(String str) {
        /* 瀛楃涓查潪绌? */
        if (!StringUtils.isBlank(str)) {
            if (!IS_NUMBER.matcher(str).matches()) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * 鍙傛暟鏍￠獙
     * @param request
     * @param response
     * @param page
     * @param pageSize
     * @return
     * @throws IOException
     */
    public static boolean pageIsNum(HttpServletRequest request, HttpServletResponse response,
                                    String page, String pageSize) throws IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        if (!ValidateUtil.isNumeric(page) || !ValidateUtil.isNumeric(pageSize)) {
            return false;
        }
        return true;
    }

    /**
     * 楠岃瘉閲戦(绮剧‘鍒板垎)
     * @param str
     * @return
     */
    public static boolean isDecimal(String str) {
        /* 瀛楃涓查潪绌? */
        if (!StringUtils.isBlank(str)) {
            String regExp = "^([1-9]\\d{0,9}|0)([.]?|(\\.\\d{1,2})?)$";
            Pattern p = Pattern.compile(regExp);
            Matcher m = p.matcher(str);
            return m.matches();
        } else {
            return false;
        }
    }

    /**
     * 鍒ゆ柇瀛楃涓叉槸鍚︿负double绫诲瀷
     * @param str
     * @return
     */
    public static boolean isDouble(String str) {
        /* 瀛楃涓查潪绌? */
        if (!StringUtils.isBlank(str)) {
            String regExp = "^[0-9]*(\\.[0-9]*|[eE][+-][0-9]*)$";
            Pattern p = Pattern.compile(regExp);
            Matcher m = p.matcher(str);
            return m.matches();
        } else {
            return false;
        }
    }

    /**
     * Double杞琒tring
     *
     * @param d
     * @return
     */
    public static String doubleTrans(double d) {
        if (Math.round(d) - d == 0) {
            return String.valueOf((long) d);
        }
        return String.valueOf(d);
    }

    /**
     * 鏍￠獙閾惰鍗″崱鍙?
     * 鏍￠獙杩囩▼锛?
     * 1銆佷粠鍗″彿鏈?鍚庝竴浣嶆暟瀛楀紑濮嬶紝閫嗗悜灏嗗鏁颁綅(1銆?3銆?5绛夌瓑)鐩稿姞銆?
     * 2銆佷粠鍗″彿鏈?鍚庝竴浣嶆暟瀛楀紑濮嬶紝閫嗗悜灏嗗伓鏁颁綅鏁板瓧锛屽厛涔樹互2锛堝鏋滀箻绉负涓や綅鏁帮紝灏嗕釜浣嶅崄浣嶆暟瀛楃浉鍔狅紝鍗冲皢鍏跺噺鍘?9锛夛紝鍐嶆眰鍜屻??
     * 3銆佸皢濂囨暟浣嶆?诲拰鍔犱笂鍋舵暟浣嶆?诲拰锛岀粨鏋滃簲璇ュ彲浠ヨ10鏁撮櫎銆?
     *
     * @param bankCard
     * @return
     */
    public static boolean checkBankCard(String bankCard) {
        if (bankCard.length() < 15 || bankCard.length() > 19) {
            return false;
        }
        char bit = getBankCardCheckCode(bankCard.substring(0, bankCard.length() - 1));
        if (bit == 'N') {
            return false;
        }
        return bankCard.charAt(bankCard.length() - 1) == bit;
    }

    /**
     * 浠庝笉鍚牎楠屼綅鐨勯摱琛屽崱鍗″彿閲囩敤 Luhm 鏍￠獙绠楁硶鑾峰緱鏍￠獙浣?
     *
     * @param nonCheckCodeBankCard
     * @return
     */
    private static char getBankCardCheckCode(String nonCheckCodeBankCard) {
        if (nonCheckCodeBankCard == null || nonCheckCodeBankCard.trim().length() == 0
                || !nonCheckCodeBankCard.matches("\\d+")) {
            //濡傛灉浼犵殑涓嶆槸鏁版嵁杩斿洖N
            return 'N';
        }
        char[] chs = nonCheckCodeBankCard.trim().toCharArray();
        int luhmSum = 0;
        for (int i = chs.length - 1, j = 0; i >= 0; i--, j++) {
            int k = chs[i] - '0';
            if (j % 2 == 0) {
                k *= 2;
                k = k / 10 + k % 10;
            }
            luhmSum += k;
        }
        return (luhmSum % 10 == 0) ? '0' : (char) ((10 - luhmSum % 10) + '0');
    }

    /**
     * 杩囨护 Emoji
     *
     * @param source
     * @return
     */
    @SuppressWarnings("AlibabaAvoidPatternCompileInMethod")
    public static String filterEmoji(String source) {
        if (source != null) {
            Matcher emojiMatcher = EMOJI.matcher(source);
            if (emojiMatcher.find()) {
                source = emojiMatcher.replaceAll("");
                return source;
            }
            return source;
        }
        return source;
    }
}
