package com.demo;

import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by wangLin on 2015/12/4.
 */
public class RedirectInvalidUrlDispatcherServlet extends DispatcherServlet {
    @Override
    protected void noHandlerFound(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (request.getHeader("User-Agent").contains("MicroMessenger")) {
            response.sendRedirect("/wechat/front/error");
            return;
        }
    }
}
