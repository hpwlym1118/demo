/*
 * Copyright (c) 2005, 2016, EVECOM Technology Co.,Ltd. All rights reserved.
 * EVECOM PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */
package net.evecom;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @description
 *
 * @author Pellym Huang
 * @created 2018/10/25 19:39
 */
//@EnableCaching
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
@SpringBootApplication
//@EnableScheduling
@MapperScan("net.evecom.**.mapper")
public class DemoApplication extends SpringBootServletInitializer {
    /**
     * @description
     *
     * @author Pellym Huang
     * @created 2018/11/14 19:15
     */
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DemoApplication.class);
    }
    /**
     * @description
     *
     * @author Pellym Huang
     * @created 2018/10/25 19:39
     */
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
