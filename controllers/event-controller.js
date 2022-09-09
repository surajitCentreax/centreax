const Event = require('../models/event-model')

class EventController {

    static create = async (req, res) => {
        try {
            let [event_name, event_date, description] = Object.values(req.body);

            if (!event_name || !event_date || !description) {
                res.json({ status: 'failed', message: 'Please Fill-up All fields' })
            }
            const newEvent = await Event.create({ event_name, event_date, description })
            res.json({ status: 'sucess', message: 'Event Created Sucessfully' })

        } catch (error) {
                res.json({ status: 'failed', error })
        }
    }

    static read = async (req, res) => {
        try {
            const allEvents = await Event.find()
            res.json(allEvents)
        } catch (error) {
            res.json({ status: 'failed', error })
        }
    }
}

module.exports = EventController;