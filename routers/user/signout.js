const exp = require('express'),
router = exp.Router();
router.get('/user/signout',(req,res)=>{
    res.clearCookie('account');
res.redirect('/')
})
module.exports = router;