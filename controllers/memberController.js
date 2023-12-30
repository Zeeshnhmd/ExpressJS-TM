const members = require('../Members');
const uuid = require('uuid');

const getAllMembers = (req, res) => {
	res.json(members);
};

const getMemberById = (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		res.json(members.filter((member) => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
};

const createMember = (req, res) => {
	const { name, email } = req.body;
	const newMember = {
		id: uuid.v4(),
		name,
		email,
		status: 'active',
	};

	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'Please include a name and email' });
	}

	members.push(newMember);
	res.status(201).json(members);
	// res.redirect('/');
};

const updateMember = (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		const { name, email } = req.body;
		members.map((member) => {
			if (member.id === parseInt(req.params.id)) {
				member.name = name ? name : member.name;
				member.email = email ? email : member.email;
				res.json({ msg: 'Member updated', member });
			}
		});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
};

const deleteMember = (req, res) => {
	const found = members.some((member) => member.id === parseInt(req.params.id));

	if (found) {
		res.status(200).json({
			msg: 'Member deleted',
			members: members.filter(
				(member) => member.id !== parseInt(req.params.id)
			),
		});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
};

module.exports = {
	getAllMembers,
	getMemberById,
	createMember,
	updateMember,
	deleteMember,
};
