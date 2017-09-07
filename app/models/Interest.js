export default (sequelize, DataTypes) => {
  return sequelize.define('Interest', {
    name: DataTypes.STRING
  })
}
