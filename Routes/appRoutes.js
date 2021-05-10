const router = require("express").Router();

const appController = require("../controller/appController");
const isAuth = require("../middleware/isAuth");

router.get("/rooms", appController.getAllRooms);
router.post('/rooms/search', appController.searchRooms)
router.post("/rooms/newroom", appController.addNewRoom);
router.put("/room/editroom/:roomId", appController.editRoom);
router.delete("/room/delete/:roomId", appController.deleteRoom);
router.get("/room/:roomId", appController.getSpecificRoomInfo);

module.exports = router;
