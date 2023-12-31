import express from 'express';

const router = express.Router();

router.get('/', (req,res)=>{
    let testUser = {
        name: "Martina",
        last_name: "Martinez"
    }
    res.render('index', testUser);
})

export default router;