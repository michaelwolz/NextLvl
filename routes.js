const express = require('express');
const router = express.Router();

//MONGOOSE MODELS
const Person = require('./app/models/person');


//MIDDLEWARE
router.use(function (req, res, next) {
    //TODO: IMPLEMENT SOME USEFUL STUFF HERE
    console.log('API CALL');
    next();
});


//######### PERSON ROUTES #########

router.route('/person')

    .get(function (req, res) {
        Person.find(function (err, persons) {
            if (err)
                res.send(err);
            else
                res.json(persons);
        });
    })

    .post(function (req, res) {
        const person = new Person();

        person.name = req.body.name;
        person.surname = req.body.surname;
        person.alias = req.body.alias;

        person.save(function (err) {
            if (err)
                res.send(err);
            else
                res.json({message: person.alias + ' (' + person.name + ' ' + person.surname + ')' + ' created!'});
        });
    });

router.route('/person/:person_id')

    .get(function (req, res) {
        Person.findById(req.params.person_id, function (err, person) {
            if (err)
                res.send(err);
            else
                res.json(person);
        });
    })

    .put(function (req, res) {
        Person.findById(req.params.person_id, function (err, person) {
            if (err)
                res.send(err);
            else {
                if (!isEmpty(req.body.name)) person.name = req.body.name;
                if (!isEmpty(req.body.surname)) person.surname = req.body.surname;
                if (!isEmpty(req.body.alias)) person.alias = req.body.alias;

                person.save(function (err) {
                    if (err)
                        res.send(err);
                    else
                        res.json({message: person.alias + ' (' + person.name + ' ' + person.surname + ') updated!'});
                });
            }
        });
    })

    .delete(function (req, res) {
        Person.remove({
            _id: req.params.person_id
        }, function (err, person) {
            if (err)
                res.send(err);
            else
                res.json({message: req.params.person_id + ' successfully deleted'});
        });
    });


// HELPER
function isEmpty(str) {
    return (str === "" || str == null)
}

module.exports = router;