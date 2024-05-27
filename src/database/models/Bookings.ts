import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig";
import { User } from "./User";
import { Showtimes } from "./Showtimes";

const Bookings = sequelizee.define('Bookings', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      theaterId: {
        type: DataTypes.UUID
      },
      seatnumber: {
        type: DataTypes.INTEGER
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      userId: {
        type: DataTypes.UUID,
        references: {
            model:User,
      }
    },
      showtimeId: {
        type: DataTypes.UUID,
        references: {
            model:Showtimes,
      }
      }
  }); 

  Bookings.sync({  }).then(() => {
    console.log("Bookings Model synced");
  });

  export default Bookings