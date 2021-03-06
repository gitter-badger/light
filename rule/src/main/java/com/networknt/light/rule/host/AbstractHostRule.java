/*
 * Copyright 2015 Network New Technologies Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.networknt.light.rule.host;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.networknt.light.rule.AbstractRule;
import com.networknt.light.rule.Rule;
import com.networknt.light.util.ServiceLocator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Steve Hu on 2015-01-19.
 */
public abstract class AbstractHostRule extends AbstractRule implements Rule {
    static final Logger logger = LoggerFactory.getLogger(ServiceLocator.class);
    static final String CONFIG_FILE = "virtualhost.json";

    ObjectMapper mapper = ServiceLocator.getInstance().getMapper();

    public abstract boolean execute (Object ...objects) throws Exception;

    protected void addHost(Map<String, Object> data) throws Exception {
        Map<String, Object> hostMap = ServiceLocator.getInstance().getHostMap();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("base", data.get("base"));
        map.put("transferMinSize", data.get("transferMinSize"));
        map.put("supportDevices", data.get("supportDevices"));
        map.put("hostId", data.get("hostId"));
        hostMap.put((String)data.get("hostId"), map);
        writeHostMap(hostMap);
    }

    protected void updHost(Map<String, Object> data) throws Exception {
        Map<String, Object> hostMap = ServiceLocator.getInstance().getHostMap();
        Map<String, Object> map = (Map<String, Object>)hostMap.get(data.get("hostId"));
        map.put("base", data.get("base"));
        map.put("transferMinSize", data.get("transferMinSize"));
        map.put("supportDevices", data.get("supportDevices"));
        map.put("hostId", data.get("hostId"));
        writeHostMap(hostMap);
    }

    protected void delHost(Map<String, Object> data) throws Exception {
        Map<String, Object> hostMap = ServiceLocator.getInstance().getHostMap();
        hostMap.remove(data.get("hostId"));
        writeHostMap(hostMap);
    }

    private void writeHostMap(Map<String, Object> hostMap) {
        try {
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            try {
                File file = new File(System.getProperty("config.dir", "") + "/" + CONFIG_FILE);
                mapper.writeValue(file, hostMap);
            } catch (IOException ioe) {
                logger.error("Host configuration should be externalized to config.dir system property folder");
                mapper.writeValue((new File(System.getProperty("user.home") + "/virtualhost.json")), hostMap);
            }
        } catch (IOException ioe) {
            logger.error("Exception:", ioe);
        }
    }
}
