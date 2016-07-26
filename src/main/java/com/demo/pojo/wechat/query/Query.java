package com.demo.pojo.wechat.query;

/**
 * Created by tony1 on 2015/12/19.
 */
public class Query {
    private int index;
    private int size;

    public Query() {
        this(1, 10);
    }

    public Query(int index, int size) {
        if (index < 1 || size < 1) throw new IllegalArgumentException("index or size must be natural number");
        this.index = index;
        this.size = size;
    }

    /**
     * @return
     */
    public int offset() {
        return (index - 1) * size;
    }

    /**
     * @return
     */
    public int limit() {
        return size;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
