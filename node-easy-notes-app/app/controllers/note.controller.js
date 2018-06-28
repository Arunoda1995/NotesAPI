const Note = require('../models/note.model');

exports.create = (req,res)=>{

    if(!req.body.content){
        return res.status(400).send({
            message:"Note Content can not be empty"
        })
    }

    const note = new Note({

        title: req.body.title || "Untitled Note",
        content: req.body.content

    });

    note.save()
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating the note"
            })
        })
};

exports.findAll = (req,res)=>{

    Note.find()
        .then((notes)=>{
            res.send(notes);
        })
        .catch((err)=>{
            res.status(500).send({
                message:err.message || "Some Error Occured  while Retrieving notes"
            });
        });

};

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};;

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

exports.delete = (req,res)=>{
        Note.findByIdAndRemove(req.params.noteId)
            .then((note)=>{
                if(!note){
                    return res.status(404).send({
                        message: "Not found note with id" + req.params.noteId
                    })
                }

                res.send({
                    message:"Note deleted Successfully"
                })
            })
            .catch((err)=>{
                if(err.kind === "ObjectId")
                {
                    return res.status(404).send({
                        message:"Note not found with id "+ req.params.noteId
                    })
                }

                return res.status(500).send({
                    message:"Could Not delete note with id " + req.params.noteId
                })
            })
};