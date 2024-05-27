import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig"
import { Showtimes } from "./Showtimes"
import { Theater } from "./Theater"

export const Seats = sequelizee.define('Seats', {
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
        defaultValue: true
      },
      showtimeId: {
        type: DataTypes.UUID,
        references: {
            model:Showtimes,
      }
      }
  }); 

  Seats.sync().then(() => {
    console.log("Seats Model synced");
  });

 export default Seats