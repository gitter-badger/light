package com.networknt.light.rule.menu;

import com.networknt.light.rule.Rule;
import com.networknt.light.rule.blog.AbstractBlogRule;
import com.networknt.light.server.DbService;
import com.orientechnologies.orient.core.record.impl.ODocument;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by husteve on 10/29/2014.
 */
public class AddMenuRule extends AbstractMenuRule implements Rule {
    public boolean execute (Object ...objects) throws Exception {
        Map<String, Object> inputMap = (Map<String, Object>)objects[0];
        Map<String, Object> data = (Map<String, Object>)inputMap.get("data");
        Map<String, Object> payload = (Map<String, Object>) inputMap.get("payload");
        String error = null;
        if(payload == null) {
            error = "Login is required";
            inputMap.put("responseCode", 401);
        } else {
            Map<String, Object> user = (Map<String, Object>)payload.get("user");
            List roles = (List)user.get("roles");
            // this is the owner that adding menu for another site. let it go.
            if(!roles.contains("owner")) {
                error = "Role owner is required to add menu";
                inputMap.put("responseCode", 401);
            } else {
                if(user.get("host") != null) {
                    error = "Role owner should not have host in his/her profile";
                    inputMap.put("responseCode", 400);
                } else {
                    String host = (String)data.get("host");
                    String json = getMenu((String)data.get("host"));
                    if(json != null) {
                        error = "Menu for the host exists";
                        inputMap.put("responseCode", 400);
                    } else {
                        Map eventMap = getEventMap(inputMap);
                        Map<String, Object> eventData = (Map<String, Object>)eventMap.get("data");
                        inputMap.put("eventMap", eventMap);
                        eventData.put("host", host);
                        eventData.put("createDate", new java.util.Date());
                        eventData.put("createUserId", user.get("userId"));

                        // make sure all menuItems exist if there are any.
                        List<String> menuItemRids = (List<String>)data.get("menuItems");
                        if(menuItemRids != null && menuItemRids.size() > 0) {
                            List<String> menuItemIds = new ArrayList<String>();
                            for(String menuItemRid: menuItemRids) {
                                if(menuItemRid != null) {
                                    ODocument menuItem = DbService.getODocumentByRid(menuItemRid);
                                    if(menuItem == null) {
                                        error = "MenuItem with @rid " + menuItemRid + " cannot be found.";
                                        inputMap.put("responseCode", 404);
                                        break;
                                    } else {
                                        menuItemIds.add(menuItem.field("id"));
                                    }
                                }
                            }
                            eventData.put("menuItems", menuItemIds);
                        }

                    }
                }
            }
        }
        if(error != null) {
            inputMap.put("error", error);
            return false;
        } else {
            return true;
        }
    }
}
