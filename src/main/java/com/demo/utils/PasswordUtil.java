package com.demo.utils;

import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;

/**
 * 密码生成工具
 * Created by zt on 2016/1/26.
 */
public final class PasswordUtil {

    public static final String generateSalt() {
        SecureRandomNumberGenerator secureRandomNumberGenerator = new SecureRandomNumberGenerator();
        return secureRandomNumberGenerator.nextBytes().toHex();
    }

    public static final String getMd5Password(String password, String salt) {
        return new Md5Hash(password, salt).toBase64();
    }
}
