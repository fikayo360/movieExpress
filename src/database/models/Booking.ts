import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig";
import { User } from "./User";
import { Showtime } from "./Showtime";

const Booking = sequelizee.define('Bookings', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      seatnumber: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.UUID,
        references: {
            model:User,
      }
    },
    totalPrice:{
      type: DataTypes.INTEGER
    },
      showtimeId: {
        type: DataTypes.UUID,
        references: {
            model:Showtime,
      }
      }
  }); 

  Booking.sync().then(() => {
    console.log("Bookings Model synced");
  });

  export default Booking