const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger').default;


class TicketRepository {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getTickets() {
        
        try {
            const tickets = await this.db.tickets.findAll();
            console.log('tickets:::', tickets);
            return tickets;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createTicket(ticket) {
        let data = {};
        try {
            ticket.createdate = new Date().toISOString();
            data = await this.db.tickets.create(ticket);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateTicket(ticket) {
        let data = {};
        try {
            ticket.updateddate = new Date().toISOString();
            data = await this.db.tickets.update({...ticket}, {
                where: {
                    id: ticket.id
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteTicket(ticketId) {
        let data = {};
        try {
            data = await this.db.tickets.destroy({
                where: {
                    id: ticketId
                }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new TicketRepository();