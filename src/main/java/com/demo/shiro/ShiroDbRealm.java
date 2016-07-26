package com.demo.shiro;

import com.google.common.base.Objects;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import java.io.Serializable;

/**
 * Created by zt on 2015/11/20.
 */
public class ShiroDbRealm extends AuthorizingRealm {

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        return null;
    }

    /**
     * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息.
     */
    public static class ShiroUser implements Serializable {
        private static final long serialVersionUID = -1373760761780840081L;
        public Long id;
        public Integer jobNO;
        public String name;
        public Long companyId;

        public ShiroUser(Long id, Integer jobNO, String name, Long companyId) {
            this.id = id;
            this.jobNO = jobNO;
            this.name = name;
            this.companyId = companyId;
        }

        public String getName() {
            return name;
        }

        public Long getCompanyId() {
            return companyId;
        }

        /**
         * 本函数输出将作为默认的<shiro:principal/>输出.
         */
        @Override
        public String toString() {
            return name;
        }

        /**
         * 重载hashCode,只计算jobNo;
         */
        @Override
        public int hashCode() {
            return Objects.hashCode(jobNO);
        }

        /**
         * 重载equals,只计算jobNo;
         */
        @Override
        public boolean equals(Object obj) {
            if (this == obj) {
                return true;
            }
            if (obj == null) {
                return false;
            }
            if (getClass() != obj.getClass()) {
                return false;
            }
            ShiroUser other = (ShiroUser) obj;
            if (jobNO == null) {
                if (other.jobNO != null) {
                    return false;
                }
            } else if (!jobNO.equals(other.jobNO)) {
                return false;
            }
            return true;
        }
    }
}
