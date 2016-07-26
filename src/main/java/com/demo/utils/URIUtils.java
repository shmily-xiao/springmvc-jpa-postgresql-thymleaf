package com.demo.utils;

import java.util.Optional;

/**
 * Created by wzj on 2015/12/4.
 * <p>
 * 功能：
 * 拼接字符串
 */
public class URIUtils {

    public static String buildURI(String requestURI, String queryString) {

        return String.format("%s%s", requestURI, Optional.ofNullable(queryString).isPresent() ? "?".concat(queryString) : "").trim();
    }
}
