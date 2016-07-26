package com.demo.annotation.wechat;

import java.lang.annotation.*;

/**
 * Created by wangLin on 2015/12/5.
 * 功能：微信端进行日志记录
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface WechatControllerLog {
    public String message() default "";
}
