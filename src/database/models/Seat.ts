import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig"
import Showtime from "./Showtime";
import { Theater } from "./Theater"

export const Seat = sequelizee.define('Seats', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      theaterId: {
        type: DataTypes.UUID,
        references:{
          model:Theater
        }
      },
      seatnumber: {
        type: DataTypes.INTEGER
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      showtimeId: {
        type: DataTypes.UUID,
        references: {
            model:Showtime,
      }
      }
  }); 

  Seat.sync().then(() => {
    console.log("Seats Model synced");
  });

 export default Seat