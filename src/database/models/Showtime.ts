import { DataTypes } from "sequelize"
import sequelizee from "../postgresConfig"
import { Theater } from "./Theater"
import Movie from "./Movie"

export const Showtime = sequelizee.define('Showtimes', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      startTime: {
        type: DataTypes.TIME
      },
      endTime: {
        type: DataTypes.TIME
      },
      theaterId: {
        type: DataTypes.UUID,
        references: {
            model:Theater,
      },
    },
      movieId: {
        type: DataTypes.UUID,
        references: {
            model:Movie,
      }
    }
  }); 

  Showtime.sync().then(() => {
    console.log("Showtimes Model synced");
  });

export default Showtime