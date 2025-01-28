const { Room, Booking } = require('./room');

describe ("ROOM Class Test", () =>{

  const room = new Room("Suite", 45000, 10)

  test ("Identify a room by its name, rate, and discount", () => {
    expect(room.name).toBe("Suite");
    expect(room.rate).toBe(45000);
    expect(room.discount).toBe(10);
  });

  /* TEST 2: Check room name, rate, and discount attributes.

  1.Test when its given a VALID discount.
  2.Test when its given a NEGATIVE discount.
  3.Test when its given EXCESSIVE discount.

*/

  test("Room rate should be valid, and discounts should be within acceptable range", () => {
    expect(()=> new Room ( "Suite", 10)).not.toThrow();
    expect(()=> new Room ( "Suite", 35000, -20 )).toThrow("Negative discounts are not possible");
    expect(()=> new Room ( "Suite", 35000, 120 )).toThrow("Discount can't exceed 100%");

  });



  /* TEST 3: Check if room is booked? 

  1. Test BOOKED ROOM desired dates.
  2. Test BOOKED ROOM on the Check-out.
  4. Test AVAILABLE ROOM desired dates.
  

  */

  test("isOccupied should return TRUE if the room is booked on the given date", () => {
    const bookings = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
    room.bookings.push(bookings);
    expect(room.isOccupied(new Date("2025-03-28"))).toBeTruthy();
  });

  test("isOccupied should return TRUE if the room is booked on the check-out date", () => {
    const bookings = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
    room.bookings.push(bookings);
    expect(room.isOccupied(new Date("2025-03-31"))).toBeTruthy();
  });

  test("isOccupied should return FALSE if the room has no bookings", () => {
    expect(room.isOccupied(new Date("2025-03-01"))).toBeFalsy();
  });




  /*TEST 4: Occupancy percentage
  
    1. Test when there's NO bookings.
    2. Test when there's bookings with the right date.
    3. Test when there's bookings, but NOT the right date. */

    test("occupancyPercentage return 0 for dates WITHOUT bookings", () => {
      expect(room.occupancyPercentage(new Date("2025-03-01"), new Date("2025-03-05"))).toBe(0);
    });
  
    test("occupancyPercentage should calculate the RIGHT given range", () => {
      const bookings = new Booking("Eva Sevillano", "evasevillano@test.com", new Date("2025-03-28"), new Date("2025-03-31"), 10, room);
      room.bookings.push(bookings);
      expect(room.occupancyPercentage(new Date("2025-03-28"), new Date("2025-03-31"))).toBe(100);
    });
  
    test("occupancyPercentage should return 0 if the DATE RANGE is invalid", () => {
      expect(room.occupancyPercentage(new Date("2025-03-10"), new Date("2025-03-05"))).toBe(0);
    });



/* TEST 5: Check available rooms 
*/
test("availableRooms should return rooms that are not occupied in the given range", () => {
  const bookings = new Booking("Eva Sevillano", "evasevillano@example.com", new Date("2025-03-06"), new Date("2025-03-08"), 10, room);
  room.bookings.push(bookings);

  const room2 = new Room("Double Bed", 35000, 10);
  const rooms = [room, room2];
  const availableRooms = Room.availableRooms(rooms, new Date("2025-03-06"), new Date("2025-03-10"));
  expect(availableRooms).toContain(room2);
  expect(availableRooms).not.toContain(room);
});
});






 //BOOKING TEST
describe("BOOKING Class Test", () => {

  const room = new Room("Suite", 35000, 10);

    // TEST 1: Validate total Fee.
  test("Booking properties should be assigned correctly", () => {
    const booking = new Booking("Eva Sevillano","evasevillano@test.com",new Date("2025-03-28"),new Date("2025-03-31"),10,room);

    expect(booking.name).toBe("Eva Sevillano");
    expect(booking.email).toBe("evasevillano@test.com");
    expect(booking.checkIn).toEqual(new Date("2025-03-28"));
    expect(booking.checkOut).toEqual(new Date("2025-03-31"));
    expect(booking.discount).toBe(10);
    expect(booking.room).toBe(room);
  });

  // TEST 2: Calculate TOTAL fee.
  test("Booking fee should calculate correctly with discounts", () => {
    const booking = new Booking("Eva Sevillano","evasevillano@test.com",new Date("2025-03-28"),new Date("2025-03-31"),10, room);

    expect(booking.fee).toBe(112000); 
  });

  // TEST 3: Validate fee WITHOUT discount.
  test("Booking fee should calculate correctly without any discount", () => {
    const noDiscountRoom = new Room("Single", 35000, 0);
    const booking = new Booking("Eva Sevillano","evasevillano@test.com",new Date("2025-03-28"),new Date("2025-03-31"),0, noDiscountRoom);

    /* Doing the math:
    1. 4 days (March 28, 29, 30, 31)
    2. Base: 4 days * 35000 =140000 (Total expected, without discounts) */

    expect(booking.fee).toBe(140000);
  });

  // TEST 4: Handle invalid date range.
  test("Booking with invalid date range should throw an error", () => {
    expect(() => {new Booking("Eva Sevillano","evasevillano@test.com",new Date("2025-03-31"), new Date("2025-03-28"),10,room);
    }).toThrow("Check your dates: Check-In date must be before Check-Out date");
  });

  // TEST 5: Validate invalid email format.
  test("Booking with invalid email should throw an error", () => {
    expect(() => {new Booking("Eva Sevillano","evasevillano",new Date("2025-03-28"),new Date("2025-03-31"),10,room);
    }).toThrow("Invalid email address!");
  });

  // TEST 6: Validate valid email format.
  test("Booking with a valid email should not throw an error", () => {
    expect(() => {new Booking("Eva Sevillano","evasevillano@test.com",new Date("2025-03-28"),new Date("2025-03-31"),10,room);
    }).not.toThrow();
  });

});
