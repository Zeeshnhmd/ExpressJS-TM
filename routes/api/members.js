const express = require('express');
const {
	getAllMembers,
	getMemberById,
	createMember,
	updateMember,
	deleteMember,
} = require('../../controllers/memberController');

const router = express.Router();

router.get('/members', getAllMembers);
router.get('/member/:id', getMemberById);
router.post('/members', createMember);
router.put('/member/:id', updateMember);
router.delete('/member/:id', deleteMember);

module.exports = router;
