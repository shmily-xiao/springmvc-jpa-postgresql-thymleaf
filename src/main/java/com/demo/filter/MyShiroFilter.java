package com.demo.filter;


import org.springframework.web.filter.DelegatingFilterProxy;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

/**
 * Created by lijun on 2016/1/6.
 */
public class MyShiroFilter extends DelegatingFilterProxy {
    private String excludedPages;

    private String[] excludeArray;

    public String getExcludedPages() {
        return excludedPages;
    }

    public void setExcludedPages(String excludedPages) {
        this.excludedPages = excludedPages;
        if(excludedPages!=null){
            this.excludeArray = excludedPages.split(",");
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if(excludeArray!=null){
            for(String exclude : excludeArray){
                if(((XssRequestWrapper) request).getServletPath().startsWith(exclude)){
                    request.setAttribute("shiroFilter.FILTERED", "");
                }
            }
        }
        super.doFilter(request,response,filterChain);
    }
}
