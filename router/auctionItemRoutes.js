const express=require("express");
const router=express.Router();
const { addNewAuctionItemController,getAllItems,getAuctionDetails,getMyAuctionItems,removeFromAuction,republishItem } = require("../controllers/auctionItemController");
const {isAuthenticated,isAuthorized} = require("../middlewares/auth");

router.post("/create",isAuthenticated,isAuthorized("Auctioner"),addNewAuctionItemController);
router.get("/allitems",getAllItems);
router.get("/myitems",isAuthenticated,isAuthorized("Auctioner"),getMyAuctionItems);
router.get("/auction/:id",isAuthenticated,getAuctionDetails);
router.delete("/delete/:id",isAuthenticated,isAuthorized("Auctioner"),removeFromAuction);
router.put("item//republish/:id",isAuthenticated,isAuthorized("Auctioner"),republishItem);
module.exports=router;
