const MathOlympiad = require('../models/MathOlympiad.model')


const getMO = (req,res) => {
    res.render("math-olympiad/register.ejs", { error: req.flash("error") });
}

const postMO = (req,res) => {
    const{name, category, contact ,email, institution, tshirt} = req.body
    console.log(name)
    console.log(category)
    console.log(contact)
    console.log(email)
    console.log(institution)
    console.log(tshirt)

    let registrationFee = 0;
    if (category == "School") {
        registrationFee = 250;
    } else if (category == "College") {
        registrationFee = 400;
     } else {
        registrationFee = 500;
    }

    const total = registrationFee;
    const paid = 0;
    const selected = false;

    let error = "";

    //if name & contact differs, only then we will store to database
    MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
        if (participant) {
            error = "Participant with same name and contact exists";
            req.flash("error", error);
            res.redirect("/MathOlympiad/register");
        } else {
        const participant = new MathOlympiad({
            name,
            category,
            contact,
            email,
            institution,
            paid,
            total,
            selected,
            tshirt,
        });
        participant
            .save()
            .then(() => {
            error = "Participant has been registered successfully!!";
            req.flash("error", error);
            res.redirect("/MathOlympiad/register");
            })
            .catch(() => {
            error = "Unexpected error";
            req.flash("error", error);
            res.redirect("/MathOlympiad/register");
            });
        }
    });

    //res.render('math-olympiad/register.ejs')
}

const getMOList = (req,res) => {
    let all_participant = [];
    let error = "";
    MathOlympiad.find().then((data) => {
        all_participant = data
        res.render('math-olympiad/list.ejs', {
            error:req.flash('error'),
            participants: all_participant,
        });

    }).catch(() => {
        error = "Failed to fetch data!"
        res.render('math-olympiad/list.ejs', {
            error: req.flash('error', error),
            participants: all_participant,
        });
    });
};
const deleteMO = (req,res) => {
    const id = req.params.id;
    //console.log(id);
    MathOlympiad.deleteOne({_id: req.params.id}).then(() => {
        let error = 'Data has been deleted successfully!';
        req.flash('error', error);
        res.redirect('/MathOlympiad/list');
    })
    .catch(() => {
        let error='Failed to delete data!';
        req.flash('error',error);
        res.redirect('/MathOlympiad/list');
    });
};

module.exports = {getMO, postMO, getMOList, deleteMO}