package com.mo.SpringBootConf;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
/**
 * @author WindShadow
 * @verion 2020/2/22.
 */
@Configuration
public class StaticConf extends WebMvcConfigurerAdapter{


    /**
     * 描述:
     * 静态文件配置
     * @author huifer
     * @date 2019-01-01
     */

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("*js*").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("*css*").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("*fonts*").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("*images*").addResourceLocations("classpath:/static/");
        super.addResourceHandlers(registry);
    }

}
