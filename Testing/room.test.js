const { Room } = require('./room');

describe ("ROOM Class Test", () =>{

  const room = new Room("Suite", 45000, 10)

// TEST 1: Check room name, rate, and discount attributes.

  test ("Identify a room by its name, rate, and discount", () => {
    expect(room.name).toBe("Suite");
    expect(room.rate).toBe(45000);
    expect(room.discount).toBe(10);
  });

  test("Room rate should be valid, and discounts should be within acceptable range", () => {
    expect(()=> new Room ( "Suite", ))

    // Test when its given a NEGATIVE discount
    expect(()=> new Room ( "Suite", 35000, -20 )).toThrow("Check with our team.Negative discounts are not possible")

    // Test when its given EXCESSIVE discount
    expect(()=> new Room ( "Suite", 35000, 120 )).toThrow("Check with our team. Discount cant exceed 100%")

  });



  // TEST 2: Check if room is booked?

      // Test BOOKED ROOM desired dates
  test("isOccupied should return TRUE if the room is booked on the given date", () => {
    const bookings = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("28-03-2025"), new Date ("31-03-2025"), 10, room);
    room.bookings.push(booking);
    expect(room.isOccupied(new Date ("28-03-2025"))).toBeTruthy();

  });
    // Test BOOKED ROOM 
  test("isOccupied should return TRUE if the room is booked on the check-out date", () => {
    expect(room.isOccupied(new Date("29-03-2025"))).toBeTruthy();
});
    // Test AVAILABLE ROOM
  test("isOccupied should return FALSE if the room has no bookings", () => {
    expect(room.isOccupied(new Date("01-03-2025"))).toBeFalsy();
});



  // TEST 3: Occupancy percentage

      // Test when there's NO bookings
  test("occupancyPercentage return 0 for dates WITHOUT bookings", () => {
    expect(room.occupancyPercentage(new Date("2025-03-01"), new Date("2025-03-05"))).toBe(0);
});

      // Test when there's bookings with the right date
  test("occupancyPercentage should calculate the RIGHT given range", () => {
    expect(room.occupancyPercentage(new Date("01-03-2025"), new Date("05-03-2025"))).toBe(50);

});

      // Test when there's bookings, but NOT the right date
test("occupancyPercentage should return 0 if the DATE RANGE is invalid", () => {
  expect(room.occupancyPercentage(new Date("10-03-2025"), new Date("05-03-2025"))).toBe(0);
});




// TEST 4: Check available rooms
test("availableRooms should return rooms that are not occupied in the given range", () => {
    const room2 = new Room("Double Bed", 35000, 10);
    const rooms = [room, room2]; 
    const availableRooms = Room.availableRooms(rooms, new Date("06-03-2025"), new Date("10-03-2025"));
    expect(availableRooms).toContain(room2); 
    expect(availableRooms).not.toContain(room);
});


});
