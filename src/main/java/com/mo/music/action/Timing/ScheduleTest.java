package com.mo.music.action.Timing;

import com.mo.ToolClass.DeleteFiles;
import com.mo.music.dao.mapper.DownloadInfoCRUD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;

import com.mo.music.action.Config;

/**
 * 定时任务
 * @author Administrator
 *
 */
@Component
public class ScheduleTest {

    @Autowired
    DownloadInfoCRUD downloadInfoCRUD;

    @Bean
    public TaskScheduler scheduledExecutorService() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(8);
        scheduler.setThreadNamePrefix("scheduled-thread-");
        return scheduler;
    }
	
	/**
	 * 每月 1号 00:00:00
	 * 更新用户下载
	 */
    @Scheduled(cron = "0 0 0 1 * ?")
    public void schTest1() {
    	System.out.println("********************************进入更新************************************");
    	System.out.println("月初更新    "+downloadInfoCRUD.modifyAllAlready_downloaded());
    }
    
    /**
     * 每天 凌晨 12点触发
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void schTest2() {
    	new DeleteFiles().delAllFile(Config.PATH);
    }
    
}
