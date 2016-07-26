package com.demo.annotation.wechat;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by wzj on 2015/12/4.
 * <p>
 * 功能：
 * 在进入方法的时候，先会检测用户是否登录，没有登录会到相应的拦截器中
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface WechatUserLogin {

}
