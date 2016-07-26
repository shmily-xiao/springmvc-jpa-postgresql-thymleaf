package com.demo;

import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.testng.annotations.Test;

/**
 * Created by XuHui on 2015/11/25.
 */
@ContextConfiguration("classpath:applicationContext.xml")
public class AppTests extends AbstractTransactionalTestNGSpringContextTests{

    @Test
    @Rollback(false)
    public void testMD5(){
        String str=new String("1234");
        String solt=new String("0");
        System.out.println(new Md5Hash(str, solt).toBase64().toCharArray());
    }

}
