package com.demo.utils;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * 序列生成器
 * Created by igotti on 15-3-26.
 */
public class Sequences {

    public static final char[] DIGITAL = "0123456789".toCharArray();

    public static final char[] ALPHA = "abcdefghijklmnopqrstuvwxyz".toCharArray();

    public static final char[] ALPHANUM = "0123456789abcdefghijklmnopqrstuvwxyz".toCharArray();

    public static final char[] UPPER_ALPHA_NUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();

    private static SecureRandom SecureRandom;

    static {
        try {
            SecureRandom = SecureRandom.getInstance("SHA1PRNG");
        } catch (NoSuchAlgorithmException e) {/*this couldn't happen*/}
    }

    /**
     * 生成指定长度的纯数字的随即序列
     * @param length
     * @return
     */
    public static String generate(int length){
        return generate(DIGITAL,length);
    }

    /**
     * 生成指定长度,字符空间的随即序列
     * @param sequences
     * @param length
     * @return
     */
    public static String generate(char[] sequences, int length){
        if(SecureRandom!=null){
            int space = sequences.length;
            return Arrays.stream(new int[length]).mapToObj(i->String.valueOf(sequences[SecureRandom.nextInt(space)])).collect(Collectors.joining(""));
        }
        return "";
    }

}
