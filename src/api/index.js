import user from "./user"
import shop from "./shop"
import myserve from "../request/getRequest"
myserve.parseRouter("user",user)
myserve.parseRouter("shop",shop)
export default myserve
