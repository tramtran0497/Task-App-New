const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const router = new express.Router();

router.post("/tasks", auth, async(req, res) => {
    try{
        const task = await new Task({
            ...req.body,
            owner: req.user._id,
        });
        await task.save();
        res.send(task);
    }catch(error){
        res.status(400).send(error.message);
    }
});

// sort. filter and paginating get tasks
router.get("/tasks", auth, async(req, res) => {
    const match = {};
    const sort = {};
    if(req.query.completed) {
        match.isCompleted = req.query.completed;
    };
    if(req.query.sortBy){
        const partsOfSort = req.query.sortBy.split(":");
        sort[partsOfSort[0]] = partsOfSort[1] === "desc" ? 1 : -1;
    }
    try{
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip:  parseInt(req.query.skip),
                sort,
            }
        });
        res.send(req.user.tasks);
    }catch(err){
        res.status(500).send(err.message);
    };
});

router.get("/task/:id", auth, async(req, res) => {
    const {id}= req.params;

    try{
        const task = await Task.findOne({id, owner: req.user._id});
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(err){
        res.status(500).send(err.message);
    };
});

router.patch("/task/:id", auth, async(req, res) => {
    const {id} = req.params;

    // if changes are not including
    const allowUpdate = ["name", "description", "isCompleted"];
    const updates = Object.keys(req.body);
    
    const isValidOperation = updates.every(update => allowUpdate.includes(update));
    if(!isValidOperation) return res.status(400).send("Invalid Updates!");
    try{
        const task = await Task.findOne({id, owner: req.user._id });
        if(!task) return res.status(404).send();

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    }catch(error) {
        res.status(500).send(error.message);
    };
});

router.delete("/task/:id", auth, async(req, res) =>{
    const {id}= req.params;

    try{
        await Task.findOneAndDelete({id, owner: req.user._id});
        res.send("Successful delete!");
    }catch(error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;