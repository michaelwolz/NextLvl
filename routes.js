const express = require('express');
const router = express.Router();

//MONGOOSE MODELS
const Person = require('./app/models/person');


//MIDDLEWARE
router.use(function (req, res, next) {
    //TODO: IMPLEMENT SOME USEFUL STUFF HERE
    console.log('API CALL: URI >', req.originalUrl, ', HTTP-METHOD >', req.method);
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
                Object.keys(req.body).forEach(function (key) {
                    if (key != "attrs") {
                        if (!isEmpty(req.body[key])) person[key] = req.body[key];
                    } else {
                        try {
                            let attrs = JSON.parse(req.body[key]);

                            Object.keys(attrs).forEach(function (attrKey) {
                                person.attrs[attrKey] = attrs[attrKey]
                            });
                        } catch (err) {
                            console.error("Error while parsing JSON: " + err);
                        }
                    }
                });

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