const MathOlympiad = require('../models/MathOlympiad.model')


const getMO = (req,res) => {
    res.render('math-olympiad/register.ejs')
}

const postMO = (req,res) => {
    const{name, category, contact ,email, institution, tshirt} = req.body
    console.log(name)
    console.log(category)
    console.log(contact)
    console.log(email)
    console.log(institution)
    console.log(tshirt)
    res.render('math-olympiad/register.ejs')
}

const getMOList = (req,res) => {
    res.render('math-olympiad/list.ejs')
}
const deleteMO = (req,res) => {
    const id = req.params.id
    console.log(id)
    res.render('math-olympiad/register.ejs')
}

module.exports = {getMO, postMO, getMOList, deleteMO}