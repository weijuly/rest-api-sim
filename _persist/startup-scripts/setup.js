db = db.getSiblingDB('ra_simulator');
db.createUser({
    user: 'TonyStark',
    pwd: 'PepperPots',
    roles: [{
        role: 'readWrite',
        db: 'ra_simulator'
    }]
});
// db.trello.insert({
//     id: 'card-01',
//     header: 'Task 01',
//     description: 'task description',
//     due: new Date(),
//     state: 'b',
//     owner: 'gganesan'
// });
// db.trello.insert({
//     id: 'card-02',
//     header: 'Task 02',
//     description: 'task description',
//     due: new Date(),
//     state: 'b',
//     owner: 'sthirugnanansamba'
// });
// db.users.insert({username: 'antman'});
// db.users.insert({username: 'batman'});
// db.users.insert({username: 'catman'});
// db.users.insert({username: 'dogman'});
// db.users.insert({username: 'eelman'});
// db.users.insert({username: 'foxman'});