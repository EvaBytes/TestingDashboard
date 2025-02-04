"use strict";
class Room {
    constructor(name, rate, discount) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid name: please enter an existing room type");
        }
        if (typeof rate !== "number" || isNaN(rate) || rate <= 0) {
            throw new Error("Rate must be a valid number and greater than 0");
        }
        if (discount < 0) {
            throw new Error("Negative discounts are not possible");
        }
        if (discount > 100) {
            throw new Error("Discount can't exceed 100%");
        }
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount;
    }
    isOccupied(date) {
        return this.bookings.some(booking => date >= booking.checkIn && date <= booking.checkOut);
    }
    occupancyPercentage(startDate, endDate) {
        if (startDate > endDate)
            return 0;
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
        const occupiedDays = this.bookings.reduce((days, booking) => {
            const overlapStart = new Date(Math.max(booking.checkIn.getTime(), startDate.getTime()));
            const overlapEnd = new Date(Math.min(booking.checkOut.getTime(), endDate.getTime()));
            if (overlapStart <= overlapEnd) {
                days += (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
            }
            return days;
        }, 0);
        return Math.min(100, (occupiedDays / totalDays) * 100);
    }
    static totalOccupancyPercentage(rooms, startDate, endDate) {
        if (!rooms || rooms.length === 0 || !startDate || !endDate || endDate <= startDate) {
            return 0;
        }
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
        let totalOccupiedDays = 0;
        for (const room of rooms) {
            for (const booking of room.bookings) {
                const overlapStart = new Date(Math.max(booking.checkIn.getTime(), startDate.getTime()));
                const overlapEnd = new Date(Math.min(booking.checkOut.getTime(), endDate.getTime()));
                if (overlapStart <= overlapEnd) {
                    totalOccupiedDays += (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
                }
            }
        }
        const totalRoomDays = rooms.length * totalDays;
        const percentage = (totalOccupiedDays / totalRoomDays) * 100;
        return Math.round(percentage);
    }
    static availableRooms(rooms, startDate, endDate) {
        return rooms.filter(room => {
            return !room.bookings.some(booking => {
                return ((startDate >= booking.checkIn && startDate <= booking.checkOut) ||
                    (endDate >= booking.checkIn && endDate <= booking.checkOut) ||
                    (startDate <= booking.checkIn && endDate >= booking.checkOut));
            });
        });
    }
}
class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        if (!name || name.trim() === "") {
            throw new Error("Name cannot be empty");
        }
        if (/\d/.test(name)) {
            throw new Error("Name must not contain numbers");
        }
        if (/[^a-zA-Z\s]/.test(name)) {
            throw new Error("Name contains invalid characters");
        }
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email address!");
        }
        if (checkIn >= checkOut) {
            if (checkIn.getTime() === checkOut.getTime()) {
                throw new Error("Check-in and Check-out dates must be different!");
            }
            throw new Error("Check your dates: Check-In date must be before Check-Out date");
        }
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    get fee() {
        const days = (this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 60 * 60 * 24) + 1;
        const baseFee = days * this.room.rate;
        const totalDiscount = Math.min((this.room.discount + this.discount), 100) / 100;
        return baseFee * (1 - totalDiscount);
    }
}
module.exports = { Room, Booking };
