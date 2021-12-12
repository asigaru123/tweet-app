package rest;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="env")
public class ExternalizedConfig {
	
	private String originIp;
	
	public String getOriginIp() {
		return this.originIp;
	}
	public void setOriginIp(String originIp) {
		this.originIp = originIp;
	}
}
