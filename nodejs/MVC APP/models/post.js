const express = require('express');
const studentupload = require.main.require('./model/fileupload');
const router = express.Router();
const {check, validationResult} = require('express-validator');

router.get('/',(req,res)=>{
    var data = {
       email: req.session.email
        
    };
    studentupload.fileupload(data, function(results) {
        res.render('pages/student/uploadfile', { data: results });
    });
});

router.post('/',[
    check('title','Fill the title').exists().isLength({min:2}),
    check('file','Select the file').exists().isLength({min:3}),
    check('description','fill the description').exists().isLength({min:5}),
    check('id','fill the id').exists()
    
],(req,res)=>{
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Invalid Data");
		console.log(errors);
		const alert = errors.array();

        res.render('pages/student/uploadfile',{alert});
    } else {
    
    let fileName = req.files.file;
    let uploadPath = 'assets/images/upload/' + fileName.name;

    var user =
    {
        title: req.body.title,
        file: uploadPath,
        description: req.body.description,
        id: req.body.id,
        
    };
    studentupload.insert(user, function(status){
        if(status)
        {
            req.session.id =  user.id;
            req.session.email = user.email;
            console.log(fileName);
            fileName.mv(uploadPath, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
           
            res.redirect('/skill');
			//res.redirect('/uploadfile');
		}else{
			res.redirect('/uploadfile');
		
        }
    });
}
});




module.exports = router;