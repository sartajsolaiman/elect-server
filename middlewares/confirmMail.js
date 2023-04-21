const { model } = require("mongoose");

const confirmMail = async (req, res) => {
    try {
        const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
        await models.User.update({ confirmed: true }, { where: { id } });
    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://localhost:3001/login');
}

model.exports = confirmMail;