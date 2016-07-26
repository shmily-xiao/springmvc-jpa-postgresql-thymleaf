package com.demo.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by zt on 2015/12/11.
 */
public class XssCleanFilter implements Filter {

    FilterConfig filterConfig = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
    }

    @Override
    public void destroy() {
        this.filterConfig = null;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (HttpServletRequest.class.isInstance(request)) {
            request = new XssRequestWrapper((HttpServletRequest) request);
        }
        chain.doFilter(request, response);
    }
}
