var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Apptuned' });
});

router.post('/send_mail', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'daviesray.ornyx@gmail.com',
            pass: 'ornyxoft1990amayos'
        }
    });
    transporter.sendMail({
        from: 'daviesray.ornyx@address',
        to: 'dawoodyray@gmail.com',
        subject: 'hello',
        text: 'hello world!'
    });
    res.send({'status':'This went well'});
});
module.exports = router;
