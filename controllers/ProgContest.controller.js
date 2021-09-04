const ProgContest = require("../models/ProgContest.model");
const sendMails = require('../config/mailer');
var crypto = require('crypto');

const getPC = (req, res) => {
    res.render('prog-contest/register.ejs', { error: req.flash("error") });
};

const postPC = (req, res) => {
  const {
    teamname,
    institution,
    coachname,
    coachcontact,
    coachmail,
    coachtshirt,
    leadername,
    leadercontact,
    leadermail,
    leadertshirt,
    member1name,
    member1contact,
    member1mail,
    member1tshirt,
    member2name,
    member2contact,
    member2mail,
    member2tshirt,
  } = req.body;

  console.log(teamname);
  console.log(institution);
  console.log(coachname);
  console.log(coachcontact);
  console.log(coachmail);
  console.log(coachtshirt);
  console.log(leadername);
  console.log(leadercontact);
  console.log(leadermail);
  console.log(leadertshirt);
  console.log(member1name);
  console.log(member1contact);
  console.log(member1mail);
  console.log(member1tshirt);
  console.log(member2name);
  console.log(member2contact);
  console.log(member2mail);
  console.log(member2tshirt);

  let registrationFee = 500;

  const total = registrationFee;
  const paid = 0;
  const selected = false;
  var verificationCode = crypto.randomBytes(20).toString('hex');

  let error = "";

  //if teamname & institution differs, only then we will store to database
  ProgContest.findOne({ teamname: teamname, institution: institution }).then(
    (team) => {
      if (team) {
        error = "Team with the same name and institution already exists!";
        req.flash("error", error);
        res.redirect("/ProgContest/register");
      } else {
        const team = new ProgContest({
            teamname,
            institution,
            coachname,
            coachcontact,
            coachmail,
            coachtshirt,
            leadername,
            leadercontact,
            leadermail,
            leadertshirt,
            member1name,
            member1contact,
            member1mail,
            member1tshirt,
            member2name,
            member2contact,
            member2mail,
            member2tshirt,
            total,
            paid,
            selected,
            verificationCode
        });
        team
          .save()
          .then(() => {
            error = "Team has been registered successfully!!";
            let allEmails = [
              { name: leaderame, email: leadermail },
              { name: member1name, email: member1mail },
              { name: member2name, email: member2mail },
              { name: coachname, email: coachmail },
            ];
            
            allEmails.forEach((person) => {
              const mailOptions = {
                from: 'wasikfarhan99@gmail.com',
                to: person.email,
                subject: 'Registration on ICT Fest 2021',
                text: `You ${person.name} and your team ${teamName} has successfully registered for ICT fest programming contest. Keep this code safe: ${verificationCode}`,
              };

              sendMails(mailOptions);
            });

            req.flash("error", error);
            res.redirect("/ProgContest/register");
          })
          .catch((err) => {
            console.log(err);
            error = "Unexpected error";
            req.flash("error", error);
            res.redirect("/ProgContest/register");
          });
      }
    }
  );
};

const getPCList = (req, res) => {
    let all_team = [];
    let error = "";
    ProgContest.find().then((data) => {
        all_team = data;
        res.render('prog-contest/list.ejs', {
          error: req.flash("error"),
          teams: all_team,
        });

      }).catch(() => {
            error = "Failed to fetch data!";
            res.render('prog-contest/list.ejs', {
                error: req.flash("error", error),
                teams: all_team,
            });
      });
};

const deletePC = (req, res) => {
    const id = req.params.id;
    //console.log(id);
    ProgContest.deleteOne({ _id: req.params.id }).then(() => {
        let error = "Team data has been deleted successfully!";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      })
      .catch(() => {
        let error = "Failed to delete data!";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      });
  };

const paymentDonePC = (req, res) => {
    const id = req.params.id;

    ProgContest.findOne({ _id: id })
      .then((team) => {
        team.paid = team.total;
        team
          .save()
          .then(() => {
            let error = "Team payment completed succesfully!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          })
          .catch(() => {
            let error = "Team data could not be updated!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          });
      })
      .catch(() => {
        let error = "Team data could not be updated!";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      });
  };

  const selectPC = (req, res) => {
    const id = req.params.id;

    ProgContest.findOne({ _id: id })
      .then((team) => {
        team.selected = true;
        team
          .save()
          .then(() => {
            let error = "Team has been selected succesfully!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          })
          .catch(() => {
            let error = "Team data could not be updated";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
          });
      })
      .catch(() => {
        let error = "Team data could not be updated";
        req.flash("error", error);
        res.redirect("/ProgContest/list");
      });
  };

  const getEditPC = (req, res) => {
    const id = req.params.id;

    let info = [];
    let error = "";
    ProgContest.findOne({ _id: id })
      .then((data) => {
        info = data;
        res.render("prog-contest/edit-team.ejs", {
          error: req.flash("error"),
          team: info,
        });
      })
      .catch((e) => {
        console.log(e);
        error = "Team details could not be fetched!";
        res.render("prog-contest/edit-team.ejs", {
          error: req.flash("error", error),
          team: info,
        });
      });
  };

  const editPC = async (req, res) => {
    const id = req.params.id;
    const { 
        teamname,
        institution,
        coachname,
        coachcontact,
        coachmail,
        coachtshirt,
        leadername,
        leadercontact,
        leadermail,
        leadertshirt,
        member1name,
        member1contact,
        member1mail,
        member1tshirt,
        member2name,
        member2contact,
        member2mail,
        member2tshirt } = req.body;
    //console.log(req.body);

    let error = "";

    ProgContest.findOneAndUpdate(
      { _id: id }, 
      { teamname,
        institution,
        coachname,
        coachcontact,
        coachmail,
        coachtshirt,
        leadername,
        leadercontact,
        leadermail,
        leadertshirt,
        member1name,
        member1contact,
        member1mail,
        member1tshirt,
        member2name,
        member2contact,
        member2mail,
        member2tshirt })
      .then((data) => {
        error = "Update team infromation successful!";
            req.flash("error", error);
            res.redirect("/ProgContest/list");
      })
      .catch((e) => {
        console.log(e);
        error = "Update team information failed!";
        res.redirect("/ProgContest/list");
      });
  };

module.exports = { getPC, postPC, getPCList, deletePC, paymentDonePC, selectPC, editPC, getEditPC };