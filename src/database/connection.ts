import { connect, connection } from 'mongoose';

connect('mongodb://localhost:27017/FIPE')

const db = connection;
db.once('open', _ => {
    console.log('Database connected')
})
db.on('error', err => {
    console.log('connection error:', err)
})

