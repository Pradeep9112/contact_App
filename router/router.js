const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const cnt_schema = require('../schema/schema');
const fs = require('fs');

// Render "Add Contact" Page
router.get('/addContact', (req, res) => {
    res.render('contact_App/addContact', { title: 'Add Contact' });
});

// Add a New Contact
router.post('/addContact', async (req, res) => {
    try {
        console.log('Received payload:', req.body);
        await cnt_schema.create(req.body);
        res.redirect('/api/viewContact');
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).send('Internal Server Error');
    }
});

// // Serve CSS (Better to use express.static in server.js)
// router.get('/css', (req, res) => {
//     fs.readFile('./public/cnt.css', (err, data) => {
//         if (err) {
//             console.error('Error reading CSS file:', err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//         res.writeHead(200, { 'Content-Type': 'text/css' });
//         res.end(data);
//     });
// });

// View All Contacts
router.get('/viewContact', async (req, res) => {
    try {
        let payload = await cnt_schema.find().lean();
        res.render('contact_App/viewContact', { title: 'View Contact', payload });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Internal Server Error');
    }
});

// View a Single Contact
router.get('/contact/:id', async (req, res) => {
    try {
        let id = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }

        let payload = await cnt_schema.findById(id).lean();
        if (!payload) {
            return res.status(404).send('Contact not found');
        }

        res.render('contact_App/ContactInfo', { title: 'Contact Info', payload });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/edit/:id', async (req, res) => {
    try {
        // if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
        //     return res.status(400).send('Invalid ID format');
        // }
        let payload = await cnt_schema.findOne({ _id: req.params.id }).lean();
        if (!payload) {
            return res.status(404).send('Contact not found');
        }
        res.render('contact_App/editContact', { title: 'edit-Contact', payload });
    } catch (error) {
        console.error('Error fetching contact for edit:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/edit/:id', async (req, res) => {
    //  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    //         return res.status(400).send('Invalid ID format');
    //     }
    let editdata = await cnt_schema.findOne({ _id: req.params.id });
    editdata.fname = req.body.fname;
    editdata.lname = req.body.lname;
    editdata.num = req.body.num;
    editdata.loc = req.body.loc;
    editdata.save();
    res.redirect('/api/viewContact', 302, {})

})
router.get('/delete/:id', async (req, res) => {
    const result = await cnt_schema.deleteOne({ _id: req.params.id });
    res.redirect('/api/viewContact', 302, {})
});



module.exports = router;
