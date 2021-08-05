const ProgContest = require("../models/ProgContest.model");

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
            selected
        });
        team
          .save()
          .then(() => {
            error = "Team has been registered successfully!!";
            req.flash("error", error);
            res.redirect("/ProgContest/register");
          })
          .catch(() => {
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

module.exports = { getPC, postPC, getPCList, deletePC, paymentDonePC, selectPC };