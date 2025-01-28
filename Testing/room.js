class Room {
  constructor(name, rate, discount) {
    if (typeof rate !== "number" || rate <= 0) {throw new Error("Rate must be a valid number and greater than 0");}
    if (discount < 0) {throw new Error("Negative discounts are not possible");}
    if (discount > 100) {throw new Error("Discount can't exceed 100%");}

    this.name = name;
    this.bookings = [];
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
    return this.bookings.some(booking =>date >= booking.checkIn && date <= booking.checkOut);
  }

  occupancyPercentage(startDate, endDate) {
    if (startDate > endDate) return 0;
  
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  
    const occupiedDays = this.bookings.reduce((days, booking) => {
      const overlapStart = new Date(Math.max(booking.checkIn, startDate));
      const overlapEnd = new Date(Math.min(booking.checkOut, endDate));
      if (overlapStart <= overlapEnd) {days += (overlapEnd - overlapStart) / (1000 * 60 * 60 * 24) + 1;}
      return days;
    }, 0);
  
    return Math.min(100, (occupiedDays / totalDays) * 100);
  }


  static availableRooms(rooms, startDate, endDate) {
    return rooms.filter(room =>!room.bookings.some(booking =>startDate <= booking.checkOut && endDate >= booking.checkIn));
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    if (checkIn > checkOut) {
      throw new Error("Check your dates: Check-In date must be before Check-Out date");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email address!");
    }

    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  isValidEmail(email) {const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return emailRegex.test(email);
  }

  get fee() {
    const days = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24) + 1;
    const baseFee = days * this.room.rate;
    const totalDiscount = Math.min((this.room.discount + this.discount) / 100, 1);
    return baseFee * (1 - totalDiscount);
  }
  
}

module.exports = { Room, Booking };
