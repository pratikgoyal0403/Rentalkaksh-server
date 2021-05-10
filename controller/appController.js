const Rooms = require("../model/Room");
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json({ message: "Done", rooms });
  } catch (err) {
    console.log(err);
  }
};
exports.searchRooms = async (req, res) => {
  const { searchStr } = req.body;
  let rooms;
  try {
    rooms = await Rooms.find();
    let filteredRooms = rooms.filter(
      (room) =>
        room.title.includes(searchStr) ||
        room.address.includes(searchStr) ||
        room.numberOfRooms.toString().includes(searchStr) ||
        room.rent.toString().includes(searchStr) ||
        room.description.includes(searchStr)
    );
    res.status(200).json({ message: "DONE", searchResult: filteredRooms });
  } catch (err) {
    console.log(err);
  }
};
exports.getSpecificRoomInfo = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Rooms.findById(roomId);
    res.status(200).json({ room });
  } catch (err) {
    console.log(err);
  }
};
exports.addNewRoom = async (req, res) => {
  const {
    title,
    description,
    numberOfRooms,
    address,
    ownerName,
    ownerPhone,
    rent,
  } = req.body;
  const { path } = req.file;
  try {
    const room = new Rooms({
      title,
      description,
      numberOfRooms,
      address,
      ownerName,
      ownerPhone,
      rent,
      roomImageUrl: path,
    });
    const savedRoom = await room.save();
    res
      .status(201)
      .json({ message: "room saved successfully", room: savedRoom });
  } catch (err) {
    console.log(err);
  }
};

exports.editRoom = async (req, res) => {
  const { roomId } = req.params;
  const {
    title,
    description,
    numberOfRooms,
    address,
    ownerName,
    ownerPhone,
    rent,
  } = req.body;
  let path = req.file?.path || undefined;
  try {
    const room = await Rooms.findById(roomId);
    let updatedRoomInfo = {
      title,
      description,
      numberOfRooms,
      address,
      ownerName,
      ownerPhone,
      rent,
      roomImageUrl: room.roomImageUrl,
    };
    if (path) {
      updatedRoomInfo.roomImageUrl = path;
    }
    for (let key in updatedRoomInfo) {
      room[key] = updatedRoomInfo[key];
    }
    const updatedRoom = await room.save();
    res
      .status(201)
      .json({ message: "Room Updated Successfully", room: updatedRoom });
  } catch (err) {
    console.log(err);
  }
};
exports.deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Rooms.findByIdAndRemove(roomId);
    res.status(200).json({ message: "DONE" });
  } catch (err) {
    console.log(err);
  }
};
