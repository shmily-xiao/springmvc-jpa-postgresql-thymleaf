package com.demo.annotation.wechat;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by wzj on 2015/12/4.
 * <p>
 * 功能：
 * 限制用户只能在微信的客户端访问
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface WechatOAuth2 {

}
