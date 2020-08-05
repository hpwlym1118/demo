/*
 * Copyright (c) 2005, 2017, EVECOM Technology Co.,Ltd. All rights reserved.
 * EVECOM PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package net.evecom.util;

import java.util.ArrayList;
import java.util.List;

/**
 * @description sql查询工具类
 *
 * @author Pellym Huang
 * @created 2019/11/7 15:29
 */
public class SqlUtil {
    /**
     * @description 获取查询Columns
     *
     * @author Pellym Huang
     * @created 2019/11/7 15:50
     */
    public static List<String> getColumns(String... columns) {
        List<String> columnsList = new ArrayList<>();
        for (String c : columns) {
            columnsList.add(c);
        }
        return columnsList;
    }

    /**
     * @description 获取查询values
     *
     * @author Pellym Huang
     * @created 2019/11/7 15:51
     */
    public static List<Object> getValues(Object... values) {
        List<Object> valuesList = new ArrayList<>();
        for (Object v : values) {
            valuesList.add(v);
        }
        return valuesList;
    }
}
