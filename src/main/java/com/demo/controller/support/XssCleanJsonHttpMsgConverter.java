package com.demo.controller.support;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.demo.utils.XssCleanStringUtil;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;

/**
 * Created by zt on 2015/12/15.
 */
public class XssCleanJsonHttpMsgConverter extends AbstractHttpMessageConverter<Object> {

    private SerializerFeature[] features = new SerializerFeature[0];
    public final static Charset UTF8     = Charset.forName("UTF-8");
    private Charset charset  = UTF8;

    public XssCleanJsonHttpMsgConverter(){
        super(new MediaType("application", "json", UTF8), new MediaType("application", "*+json", UTF8));
    }

    @Override
    protected boolean supports(Class<?> clazz) {
        return true;
    }

    public Charset getCharset() {
        return this.charset;
    }

    public void setCharset(Charset charset) {
        this.charset = charset;
    }

    public SerializerFeature[] getFeatures() {
        return features;
    }

    public void setFeatures(SerializerFeature... features) {
        this.features = features;
    }
    @Override
    protected Object readInternal(Class<? extends Object> clazz,  HttpInputMessage inputMessage)
            throws IOException, HttpMessageNotReadableException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        InputStream in = inputMessage.getBody();

        byte[] buf = new byte[1024];
        for (;;) {
            int len = in.read(buf);
            if (len == -1) {
                break;
            }
            if (len > 0) {
                baos.write(buf, 0, len);
            }
        }
        byte[] bytes = baos.toByteArray();
        // 调用非法字符处理
        String xssCleanStr = XssCleanStringUtil.cleanString(new String(bytes, charset));
        bytes = xssCleanStr.getBytes(charset);
        return JSON.parseObject(bytes, 0, bytes.length, charset.newDecoder(), clazz);
    }
    @Override
    protected void writeInternal(Object obj, HttpOutputMessage outputMessage)
            throws IOException, HttpMessageNotWritableException {
        OutputStream out = outputMessage.getBody();
        String text = JSON.toJSONString(obj, features);
        // 调用非法字符处理
        text = XssCleanStringUtil.cleanString(text);
        byte[] bytes = text.getBytes(charset);
        out.write(bytes);
    }
}
