package com.demo.utils.transport;

/**
 * Created by sczly on 2015/6/2.
 * 将hh:mm转换为秒数
 */
public class SecondParserUtil {

    public static Long parse(String str){
        return SecondParserUtil.parse(str, ":");
    }

    public static Long parse(String str,String separator){
        String[] fragment=str.split(separator,2);
        String hour=fragment[0];
        String minute=fragment[1];
        return Long.parseLong(hour)*3600+Long.parseLong(minute)*60;
    }
    public static String parse(Long second){
        Double hour=Math.floor(second/3600d);
        Double minute=Math.floor((second%3600)/60d);
        return String.format("%02d:%02d",hour.intValue(), minute.intValue());
    }
    public static String parseHour(Long second){
        Double hour=Math.floor(second/3600d);
        Integer h=hour.intValue();
        return h.toString();
    }
    public static String parseSecond(Long second){
        Double minute=Math.floor((second%3600)/60d);
        Integer m=minute.intValue();
        return m.toString();
    }

    public static String getTime(Long value){
        Double hour = Math.floor(value / 3600);
        Integer h = hour.intValue();
        h = h % 24;
        String HS = h < 10 ? "0" + h : h + "";
        Double minute = Math.floor((value % 3600) / 60);
        Integer m = minute.intValue();
        String MS = m < 10 ? "0" + m : m + "";
        return  HS + ":" + MS;
    }

    public static String getTime(Long value, int day) {
        Double hour = Math.floor(value / 3600);
        Integer h = hour.intValue();
        String days = (day + h / 24) + "";
        return "第" + days + "天" + getTime(value);
    }
}
