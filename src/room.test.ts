import { Room, Booking } from "./room";

describe ("ROOM Class Test", () =>{

  let room: Room;

/* Test 1: Name Validation.
  1. Identify the right room attributes.
  2. Name should always be a string.
  3. Reject in case theres a empty string.
  4. Reject in case theres a null or a undefined given.
*/

test("Identify a room by its name, rate, and discount", () => {
  expect(room.name).toBe("Suite");
  expect(room.rate).toBe(45000);
  expect(room.discount).toBe(10);
});

test("should accept a valid string as a name", () => {expect(() => new Room("Suite", 45000, 10)).not.toThrow();});

test("should reject an empty string", () => {
  expect(() => new Room("", 45000, 10)).toThrow("Invalid name: please enter an existing room type");
});

test("should reject null or undefined values", () => {
  expect(() => new Room(null as unknown as string, 45000, 10)).toThrow("Invalid name: please enter an existing room type");
  expect(() => new Room(undefined as unknown as string, 45000, 10)).toThrow("Invalid name: please enter an existing room type");
});

test("should reject a string with only spaces", () => {expect(() => new Room("   ", 45000, 10)).toThrow("Invalid name: please enter an existing room type");});


  /* TEST 2: Check the rate.
1.Make sure the rate is always a number.
2.Make sure there's always a benefit. 
*/
test("Throw error if rate is not a number", () => {
  expect(() => new Room("Suite", "45000" as unknown as number, 10)).toThrow("Rate must be a valid number and greater than 0");
  expect(() => new Room("Suite", NaN, 10)).toThrow("Rate must be a valid number and greater than 0");
});

test("Throw error if rate is less than or equal to 0", () => {
  expect(() => new Room("Suite", 0, 10)).toThrow("Rate must be a valid number and greater than 0");
  expect(() => new Room("Suite", -100, 10)).toThrow("Rate must be a valid number and greater than 0");
});

  /* TEST 3: Check discounts.
  1.When its given a VALID discount.
  2.When its given a NEGATIVE discount.
  3.When its given EXCESSIVE discount.
*/

test("isOccupied should return TRUE if the room is booked on the given date", () => {
  const booking = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
  room.bookings.push(booking);
  expect(room.isOccupied(new Date("2025-03-28"))).toBeTruthy();
});

test("isOccupied should return FALSE if the room has no bookings", () => {expect(room.isOccupied(new Date("2025-03-01"))).toBeFalsy();
});


  /* TEST 4: Check if room is booked? 
  1. Test BOOKED ROOM desired dates.
  2. Test BOOKED ROOM on the Check-out.
  3. Test AVAILABLE ROOM desired dates.
  */

  test("isOccupied should return TRUE if the room is booked on the given date", () => {
    const booking = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
    room.bookings.push(booking);
    expect(room.isOccupied(new Date("2025-03-28"))).toBeTruthy();
  });

  test("isOccupied should return TRUE if the room is booked on the check-out date", () => {
    const booking = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
    room.bookings.push(booking);
    expect(room.isOccupied(new Date("2025-03-31"))).toBeTruthy();
  });

  test("isOccupied should return FALSE if the room has no bookings", () => {
    expect(room.isOccupied(new Date("2025-03-01"))).toBeFalsy();
  });



  /*TEST 5: Occupancy percentage.
    1. Test when there's NO bookings.
    2. Test when there's bookings with the right date.
    3. Test when there's bookings, but NOT the right date.
  */

    test("occupancyPercentage return 0 for dates WITHOUT bookings", () => {expect(room.occupancyPercentage(new Date("2025-03-01"), new Date("2025-03-05"))).toBe(0);});
  
    test("occupancyPercentage should calculate the RIGHT given range", () => {
      const booking = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
      room.bookings.push(booking);
      expect(room.occupancyPercentage(new Date("2025-03-28"), new Date("2025-03-31"))).toBe(100);
    });
  
    test("occupancyPercentage should return 0 if the DATE RANGE is invalid", () => {expect(room.occupancyPercentage(new Date("2025-03-10"), new Date("2025-03-05"))).toBe(0);});


/* TEST 6: Available Rooms during wishing dates */
test("availableRooms should return rooms that are not occupied in the given range", () => {
  const room1 = new Room("Suite", 45000, 10);
  const room2 = new Room("Double Bed", 35000, 20);
  const room3 = new Room("Single", 30000, 5);

  const booking1 = new Booking("Eva Sevillano", "eva@test.com", new Date("2025-03-06"), new Date("2025-03-08"), 10, room1);
  room1.bookings.push(booking1);

  const booking2 = new Booking("Kutxi Romero", "kutxi@test.com", new Date("2025-03-07"), new Date("2025-03-09"), 15, room2);
  room2.bookings.push(booking2);

  const rooms = [room1, room2, room3];
  const availableRooms = Room.availableRooms(rooms, new Date("2025-03-06"), new Date("2025-03-10"));

  expect(availableRooms).toContain(room3);
  expect(availableRooms).not.toContain(room1);
  expect(availableRooms).not.toContain(room2);
});


/*Test 7: Total occupancy percentage.*/

test("totalOccupancyPercentage should calculate the correct occupancy percentage for all rooms", () => {
  const room1 = new Room("Suite", 45000, 10);
  const room2 = new Room("Double Bed", 35000, 20);
  const room3 = new Room("Single", 30000, 5);

  const booking1 = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-06"), new Date("2025-03-08"), 10, room1);
  room1.bookings.push(booking1);

  const booking2 = new Booking("Kutxi Romero", "kutxiromero@test.com", new Date("2025-03-07"), new Date("2025-03-09"), 15, room2);
  room2.bookings.push(booking2);

  const booking3 = new Booking("Robe Iniesta", "robeiniesta@test.com", new Date("2025-03-06"), new Date("2025-03-09"), 10, room3);
  room3.bookings.push(booking3);

  const rooms = [room1, room2, room3];
  const totalOccupancy = Room.totalOccupancyPercentage(rooms, new Date("2025-03-06"), new Date("2025-03-09"));
  expect(totalOccupancy).toBe(83);
});

test("totalOccupancyPercentage should return 0 if NO rooms are provided", () => {
  expect(Room.totalOccupancyPercentage([], new Date("2025-03-06"), new Date("2025-03-10"))).toBe(0);
});

test("totalOccupancyPercentage should return 0 if NO rooms are provided", () => {
  const rooms: Room[] = [];
  const startDate = new Date("2025-03-06");
  const endDate = new Date("2025-03-10");

  const totalOccupancy = Room.totalOccupancyPercentage(rooms, startDate, endDate);
  expect(totalOccupancy).toBe(0);
});

test("totalOccupancyPercentage should return 0 if NO rooms are provided with an empty array", () => {
  const rooms: Room[] = [];
  const startDate = new Date("2025-03-06");
  const endDate = new Date("2025-03-10");

  const totalOccupancy = Room.totalOccupancyPercentage(rooms, startDate, endDate);
  expect(totalOccupancy).toBe(0);
});

test("totalOccupancyPercentage should return 0 if startDate or endDate is undefined", () => {
  const rooms: Room[] = [];
  const startDate = undefined as unknown as Date;
  const endDate = undefined as unknown as Date;

  const totalOccupancy = Room.totalOccupancyPercentage(rooms, startDate, endDate);
  expect(totalOccupancy).toBe(0);
});

test("totalOccupancyPercentage should return 0 if rooms is an empty array and startDate is undefined", () => {
  const rooms: Room[] = [];
  const startDate = undefined as unknown as Date;
  const endDate = new Date("2025-03-10");

  const totalOccupancy = Room.totalOccupancyPercentage(rooms, startDate, endDate);
  expect(totalOccupancy).toBe(0);
});

test("totalOccupancyPercentage should return 0 if rooms is null", () => {
  const rooms = null as unknown as Room[];
  const startDate = new Date("2025-03-06");
  const endDate = new Date("2025-03-10");

  const totalOccupancy = Room.totalOccupancyPercentage(rooms, startDate, endDate);
  expect(totalOccupancy).toBe(0);
});

});





//BOOKING TEST
describe("BOOKING Class Test", () => {

  let room: Room;

  test("Booking properties should be assigned correctly", () => {
    const booking = new Booking(
      "Eva Sevillano",
      "evasevillano@test.com",
      new Date("2025-03-28"),
      new Date("2025-03-31"),
      10,
      room
    );

    expect(booking.name).toBe("Eva Sevillano");
    expect(booking.email).toBe("evasevillano@test.com");
    expect(booking.checkIn).toEqual(new Date("2025-03-28"));
    expect(booking.checkOut).toEqual(new Date("2025-03-31"));
    expect(booking.discount).toBe(10);
    expect(booking.room).toBe(room);
  });

  /* TEST 2: Validate Name format. */
  test("should throw an error if Name is empty", () => {
    expect(() => new Booking("", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room)).toThrowError("Name cannot be empty");
  });

  test("should throw an error if Name contains numbers", () => {
    expect(() => new Booking("Eva1234", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room)).toThrowError("Name must not contain numbers");
  });

  test("should throw an error if Name contains special characters", () => {
    expect(() => new Booking("Evit@", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room)).toThrowError("Name contains invalid characters");
  });

  /* TEST 3: Validate email format. */
  test("Booking with invalid email should throw an error", () => {
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
    }).toThrow("Invalid email address!");
  });

  test("Booking with empty email should throw an error", () => {
    expect(() => new Booking("Eva Sevillano", "", new Date("2025-03-28"), new Date("2025-03-31"), 10, room))
      .toThrow("Invalid email address!");
  });

  test("Booking with a valid email should not throw an error", () => {
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
    }).not.toThrow();
  });

  /* TEST 4: Handle booking date range. */
  test("Booking with the wrong date range should throw an error", () => {
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-31"), new Date("2025-03-28"), 10, room);
    }).toThrow("Check your dates: Check-In date must be before Check-Out date");
  });

  test("Booking with check-in and check-out on the same date should throw an error", () => {
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-28"), 10, room);
    }).toThrow("Check-in and Check-out dates must be different!");
  });

  /* TEST 5: Calculate discounts. */
  test("Booking fee should calculate correctly with discounts", () => {
    const booking = new Booking(
      "Eva Sevillano",
      "evasevillano@test.com",
      new Date("2025-03-28"),
      new Date("2025-03-31"),
      10,
      room
    );
    expect(booking.fee).toBe(112000);
  });

  test("Booking fee should calculate correctly without any discount", () => {
    const noDiscountRoom = new Room("Single", 35000, 0);
    const booking = new Booking(
      "Eva Sevillano",
      "evasevillano@test.com",
      new Date("2025-03-28"),
      new Date("2025-03-31"),
      0,
      noDiscountRoom
    );
    expect(booking.fee).toBe(140000);
  });

  test("Booking fee should calculate correctly with 100% discount", () => {
    const fullDiscountRoom = new Room("Suite", 35000, 100);
    const booking = new Booking(
      "Eva Sevillano",
      "evasevillano@test.com",
      new Date("2025-03-28"),
      new Date("2025-03-31"),
      100,
      fullDiscountRoom
    );
    expect(booking.fee).toBe(0);
  });

  /* TEST 6: Validate incorrect inputs */
  test("should throw an error if check-in date or check-out date is undefined", () => {
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano@test.com", undefined as unknown as Date, new Date("2025-03-31"), 10, room);
    }).toThrow();
    
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), undefined as unknown as Date, 10, room);
    }).toThrow();
  });

  test("should throw an error if room is null", () => {
    expect(() => {
      new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, null as unknown as Room);
    }).toThrow();
  });
});
