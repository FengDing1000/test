const exp = require('express'),
    db = require('../db'),
    router = exp.Router();
router.get('/', (req, res) => {
    db.Question.find().sort({createTime:-1}).populate({
        path: 'createUser',
        select: '-password'
    }).exec((err, models) => {
        if (err) {
            res.render('error', err);
        } else {
            // console.dir(db.toDatas(models)[0].createUser);
            res.render('index', {
                account: req.cookies.account,
                questions: db.toDatas(models)
            });

        }
    })
})

module.exports = router;