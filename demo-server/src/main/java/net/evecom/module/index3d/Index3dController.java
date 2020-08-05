package net.evecom.module.index3d;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/evecom/module/index3d/index3dCtr")
public class Index3dController {

    @RequestMapping("/index")
    public String index() {
        return "index3d/index3d";
    }
}
