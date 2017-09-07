export default (sequelize, DataTypes) => {
  return sequelize.define('Invite', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: DataTypes.STRING,
    color: DataTypes.STRING,
    gender: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN,
    invitesRemaining: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: models => {
        models.Invite.hasMany(models.Invite)
        models.Invite.hasMany(models.Interest)
      }
    },
    instanceMethods: {
      rsvp: options => {
        this.confirmed = true
        this.assign(options)
        return this.save()
      },
      invite: email => {
        if (this.invitesRemaining === 0) { throw 'No invites remaining.' }
        this.invitesRemaining--
        return this.save()
      },
      count: () => {
        return this.invitesRemaining
      }
    }
  })
}
