package com.demo.advice.wechat;

import com.demo.annotation.wechat.WechatControllerLog;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

/**
 * Created by wangLin on 2015/12/5.
 * 功能：通过AOP对在controller中贴有WechatControllerLog注解的方法进行拦截,主要用于微信端日志的处理
 */
@Aspect
@Component
public class WechatLogAspect {
    //切入点(方法上有WechatControllerLog注解的都是切入点)的配置
    @Pointcut("@annotation(com.demo.annotation.wechat.WechatControllerLog)")
    public  void controllerPointcut() {
    }

    //前置通知,在方法执行前触发
    @Before("controllerPointcut()")
    public void doBefore(JoinPoint joinPoint) throws Exception {
        //获得request对象
        //HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String message = getMessage(joinPoint);
        System.out.println("Invoking WechatControllerLog.message():" + message);

    }

    /**
     *
      *@param joinPoint 是运用aop时的参数
     * @return 通过反射得到WechatControllerLog标签里面message方法中的信息
     * @throws Exception
     */
    private  String getMessage(JoinPoint joinPoint){
        //被访问的方法
        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
        //通反射得到方法上的WechatControllerLog注解
        WechatControllerLog wechatControllerLog = method.getAnnotation(WechatControllerLog.class);
        return wechatControllerLog.message();
    }

}
