import { Sequelize } from 'sequelize';

const sequelizee = new Sequelize(
  'postgres://fikayo:kVSGAs4N8YKdDSAzMrroumsaQi7ZHeYz@dpg-cp1k1muct0pc73d2boag-a.oregon-postgres.render.com/movie_vq50',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    logging: console.log,
  },
)

sequelizee
  .authenticate()
  .then(() => {
    console.log('Connection successful!')
  })
  .catch((error) => {
    console.log('Connection failed:', error)
  })

export default sequelizee